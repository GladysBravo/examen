const http = require('http');
const _ = require('lodash');
console.log("archivo util");

const funcionCabeceras = (objs) => {
  const cabs = new Array();
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    for (const key in obj) {
      const attrName = key;
      const attrValue = obj[key];
      //Ocultamos el atributo URL, para no ser mostrado en la vista EJS
      if (attrName === "url") {} else {
        cabs.push(attrName);
      }
    }
  }
  return cabs;
};


/**
 Funcion que asigna un formato a los mensajes de respuesta para una peticion http.
 @param {estado} Estado de la peticion http.
 @param {mensaje} Mensaje a retornar.
 @param {datos} Datos obtenidos o generados para ser retornados.
 @return Retorna un {json} con los datos en el formato establecido.
*/
const funcionFormato = (_estado, _mensaje, _datos) => {
  const respuesta = {
    estado: _estado,
    mensaje: _mensaje,
    data: _datos,
  };

  return respuesta;
};

/**
 * Funcion para paginar y ordenar.
 * @param {json} query de la peticion http.
 * @return {json} query con datos adicionados.
 */
const paginar = (query) => {
  const respuesta = {};
  // page
  if(query.limit && query.page){
    respuesta.offset = (query.page - 1) * query.limit;
    respuesta.limit = query.limit;
  }
  // order
  if(query.order){
    if(query.order.charAt(0) == '-'){
      respuesta.order = `${query.order.substring(1, query.order.length)} DESC`;
    } else {
      respuesta.order = `${query.order}`;
    }
  }
  return respuesta;
};

/**
* Funcion para validar los parametros de la peticion
* @param {Array} Parametros Tiene los valores de la peticion (req.params)
* @param {objReq} Peticion Es el objeto de la peticion (req)
* @return {Array} Con tres valores estado, respuesta (true or false) y mensaje (texto)
*/


const validarParametros = (ParametrosPredefinidos, Peticion) => {
  const Parametros = Object.keys(Peticion.body);
  ParametrosPredefinidos.forEach( (value) => {
    if ( Parametros.indexOf(value) != -1 ) {
      if (!Peticion.body[value]) {
        const respuesta = [];
        respuesta.estado = 412;
        respuesta.respuesta = false;
        respuesta.mensaje = `El dato ${value} es obligatorio.`;
      }
    }
  } );
};

/**
* Funcion que genera consulta en sintaxis sequelize.
* @param  {Objeto} pObj     Objeto de parametros de busqueda
* @param  {Objeto} pModelo  Objeto sequelize del modelo base
* @param  {Objeto} pModelos Objeto que almacena los modelos sequelize adicionales
* @return {Objeto}          Retorna un objeto de consulta en sintaxis sequelize
*/
const formarConsulta = (pObj, pModelo, pModelos) => {
  // TODO: falta la distincion de busqueda para OR, por le momento se considera OR
  // TODO: considerar los campos relacionados

  // Instancia un objeto contenedor de la respuesta.
  const consulta = {};

  // Establece la lista de campos a omitir en el armado de la consulta.
  const omitir = ['limit', 'page', 'order'];

  // Instancia el objeto contenedor de los modelos relacionados.
  const relacionados = {};

  // Almacena el objeto de campos del modelo base.
  const campos = pModelo.rawAttributes;

  // Almacena el nombre de la tabla del modelo base.
  const nombreModeloBase = pModelo.getTableName();

  // Agrega los campos del modelo base al contenedor de modelos relacionados.
  relacionados[nombreModeloBase]=pModelo.rawAttributes;

  // TODO: cuantos niveles de relacion se considera?
  // TODO: modificar para hacerlo recursivo, o parametrizar el nivel de busqeuda

  // Iteracion de los campos del modelo base.
  for(let j in campos){
    // Almacena la propiedad references (contenedor de relaciones a otros modelos).
    const campo = campos[j].references;

    // Si el campo es distinto de indefinido, Almacena los campos del modelo relacionado.
    if(campo !== undefined) relacionados[campo.model] = pModelos[campo.model].rawAttributes;
  }

  // Iteracion de los campos de busqueda.
  for (let k in pObj) {

    // Si el campo de busqueda se encuentra fuera de la lista de omitidos.
    if(omitir.indexOf(k) === -1){

      // Iteracion de los modelos relacionados.
      for(let modelo in relacionados){

        // Almacena el objeto del campo de busqueda.
        let campo = relacionados[modelo][k.toLowerCase()];

        // Si el campo de busqueda existe dentro del modelo relacionado en iteracion.
        if(campo !== undefined){

          // Establece el nombre de campo condicion.
          const nombreCondicion = `condicion${_.capitalize(campo.Model.getTableName())}`;

          // Si no existe el objeto de condiciones en el objeto consulta.
          if(!consulta[nombreCondicion]) consulta[nombreCondicion] = {$and:[]};

          // Obtiene el tipo de dato del campo.
          const tipo = campo.type.constructor.key;

          // Instancia un objeto temporal.
          let obj={};

          // TODO: considerar los otros datatypes del ORM.
          /**
          * Dependiendo del tipo de dato, agrega una consulta de busqueda al objeto
          * @param  {Texto} tipo   Describe el tipo de dato.
          * @return {Objeto}       Adiciona en la consulta del modelo un objeto con sintaxis sequelize.
          */
          switch (tipo) {
            case 'STRING':
            obj[k] = {
              $iLike: `%${pObj[k]}%`
            };
            consulta[nombreCondicion].$and.push(obj);
            break;
            case 'INTEGER':
            if(isNaN(parseInt(pObj[k]))) break;
            obj[k] = {
              $eq : parseInt(pObj[k])
            };
            consulta[nombreCondicion].$and.push(obj);
            break;
            case 'DATE':
            obj[k]= pObj[k];
            consulta[nombreCondicion].$and.push(obj);
            break;
            case 'ENUM':
            obj[k]=pObj[k];
            consulta[nombreCondicion].$and.push(obj);
            break;
          }
        }
      }
    }
}

 // Si existen los campos de busqueda "limit" y "page".
 if(pObj.limit && pObj.page){
   pObj.limit = parseInt(pObj.limit);
   pObj.page = parseInt(pObj.page);
   // Establece el valor de "offset"(paginacion), tomando el cuenta el campo "limit".
   consulta.offset = (pObj.page - 1) * pObj.limit;
   // Establece el valor de "limit".
   consulta.limit = pObj.limit;
 }

 // Retorna el objeto con las consultas armadas por modelo.
 return consulta;
};

function obtenerFecha (pFecha) {
  return `${pFecha.getFullYear()}/${pFecha.getMonth()+1}/${pFecha.getDate()}`;
}

module.exports = {
  funcionCabeceras,
  funcionFormato,
  paginar,
  validarParametros,
  formarConsulta,
  obtenerFecha,
};
