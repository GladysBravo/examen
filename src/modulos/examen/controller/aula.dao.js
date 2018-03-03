const Sequelize = require('sequelize');
// import util from '../../../lib/util';

module.exports = (app) => {
  const _app = app;
  _app.dao.aula = {};

  const AulaModel = app.src.db.models.aula;

  function obtenerAulas(consulta) {
    console.log('......................---------.');
    return AulaModel.findAndCountAll({
      // attributes: ["id_aula", "nombres", "documento_identidad", "estado"],
      where: consulta.condicionSolicitud || {},
      subQuery: false,
      limit: consulta.limit,
      offset: consulta.offset,
      order: consulta.order || [['id_aula', 'ASC']],
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

  function obtenerAulaId(id_aula) {
    return AulaModel.findOne({
      // attributes: ["id_aula", "nombre", "cod_aula", "estado"],
      where: {
        id_aula
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


  _app.dao.aula.obtenerAulas = obtenerAulas;
  _app.dao.aula.obtenerAulaId = obtenerAulaId;
};
