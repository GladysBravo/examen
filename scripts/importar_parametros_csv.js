/**
 Archivo que realiza la lectura de csv's.
 */
const fs = require('fs');
const path = require('path');
const Promise = require ('bluebird');
const pg = require('pg');
const basename = path.basename(module.filename);
const dirCsv = __dirname.replace('/scripts', '') + '/public/csv';
const csv = require('fast-csv');
const util = require(`../src/lib/util`);
const conf = require(`../src/config/config`)();
console.log('\n\n\n ..........................pRespuesta---',conf);
const config = `${conf.database.params.dialect}://${conf.database.username}:${conf.database.password}@${conf.database.params.host}:${conf.database.params.port}/${conf.database.name}`;
const pgCliente = new pg.Client(config);
console.log('\n\n\n ..........................pRespuesta---',config);

obtenerDatosParametricas()
.then(pRespuesta => {
  // console.log("Verificando los datos obtenidos", pRespuesta);
  if (pRespuesta.length > 0) {
    let valores = '';
    for (const i in pRespuesta) {
      valores += `('${pRespuesta[i].grupo}', '${pRespuesta[i].sigla}','--', '${pRespuesta[i].descripcion}','${0}','ACTIVO','1','1', '${util.obtenerFecha(new Date())}','${util.obtenerFecha(new Date())}'),`;
    }
    valores = valores.substr(0, valores.length - 1);
    pgCliente.connect();
    return ejecutarConsulta(`TRUNCATE parametro`)
    .then(pRespuesta => {
      return ejecutarConsulta(`INSERT INTO parametro ( grupo, sigla, nombre, descripcion, orden, estado, _usuario_creacion, _usuario_modificacion, _fecha_creacion, _fecha_modificacion) VALUES ${valores}`)
      .then(pRespuestaConsulta => {
        console.log('Inserción de datos correcta');
        pgCliente.end();
      })
      .catch(pErrorConsulta => {
        pgCliente.end();
        console.log('Error al ejecutar la consulta', pErrorConsulta);
      });
    })
    .catch(pErrorConsulta => {
      pgCliente.end();
      console.log('Error al ejecutar la consulta', pErrorConsulta);
    });
  }
})
.catch(pError => {
  console.log('Error en la obtencion de datos', pError);
});

/**
 Funcion que obtiene datos de un csv y retorna un vector de objetos.
 @return Retorna un vector de objetos con datos a insertar a la base de datos.
 */
function obtenerDatosParametricas(){
  const datos=[];
  // Instancia una promesa.
  return new Promise ((resolve, reject) => {

    // Almacena los directorios obtenidos de la lectura.
    const lectura=fs.readdirSync(dirCsv).filter( pDirCompleto =>
      (pDirCompleto.indexOf('.') !== 0) && (pDirCompleto !== basename)
    )
    // Itera los directorios obtenidos de la lectura.
    return lectura.forEach((pItem, pIndice) => {
      // Busca en el archivo con nombre "extractoDia".
    console.log('\n\n\n\n pItem--', pItem.search('parametricas'));
      if (pItem.search('parametricas') > -1) {
        // crea un canal stream para el csv.
        console.log('\n\n\n\n dirCsv--', `${dirCsv}/${pItem}`);
        return fs.createReadStream(`${dirCsv}/${pItem}`)
        .pipe(csv())
        // Lee los datos obtenidos.
        .on("data", pData => {
          // Solo los registros con la longitud de 6.
          // console.log('\n\n\n\n ..............dataaa ...',pData[0]);
          datos.push({
            grupo: pData[0],
            sigla: pData[1],
            descripcion: pData[2]
          });
        })
        .on("end", () => {
            resolve(datos);
        });
      }
    });
  });
}

/**
 Funcion que ejecuta una promesa.
 @param {pConsulta} Texto Cadena que contiene la consulta a ejecutar.
 @return retorna una promesa.
 */
function  ejecutarConsulta(pConsulta){

  return new Promise((resolve,reject) => {

    // Instancia una consulta del tipo cliente.
    const query=pgCliente.query(pConsulta);
    console.log('\n\n\n queryyyy ', query);
    // Durante la ejecucion de la consulta,
    query.on("row", (pFila,pResultado) => {
      pResultado.addRow(pFila);
    });

    // Control cuando finaliza.
    query.on("end", pResultado => resolve(pResultado.rows))

    // Control de error.
    query.on("error", pError => reject(pError))

  });
}
