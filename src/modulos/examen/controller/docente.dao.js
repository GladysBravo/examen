const Sequelize = require('sequelize');
// import util from '../../../lib/util';

module.exports = (app) => {
  const _app = app;
  _app.dao.docente = {};

  const DocenteModel = app.src.db.models.docente;

  function obtenerDocentes(consulta) {
    return DocenteModel.findAndCountAll({
      // attributes: ["id_docente", "nombres", "documento_identidad", "estado"],
      where: consulta.condicionSolicitud || {},
      subQuery: false,
      limit: consulta.limit,
      offset: consulta.offset,
      order: consulta.order || [['id_docente', 'ASC']],
    })
    .then((pResp) => {
      const respuesta = {
        count: pResp.count,
        rows: pResp.rows,
      };
      return respuesta;
    })
    .catch(error => {
      console.log("ERROR EN LA CONSULTA", error);
      return error;
    });
  }

  function obtenerDocenteId(id_docente) {    
    return DocenteModel.findOne({
      // attributes: ["id_docente", "nombre", "cod_docente", "estado"],
      where: {
        id_docente
      },
    })
    .then((respuesta) => {
      return respuesta;
    })
    .catch((pError) => {
      console.log('Error en la obtencion de la solicitud', pError);
      return pError;
    });
  }


  _app.dao.docente.obtenerDocentes = obtenerDocentes;
  _app.dao.docente.obtenerDocenteId = obtenerDocenteId;
};
