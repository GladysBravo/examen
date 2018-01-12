const Sequelize = require('sequelize');
// import util from '../../../lib/util';

module.exports = (app) => {
  const _app = app;
  _app.dao.sala = {};

  const SalaModel = app.src.db.models.sala;

  function obtenerSalas(consulta) {
    return SalaModel.findAndCountAll({
      attributes: ["id_sala", "nombre", "cod_sala", "estado"],
      where: consulta.condicionSolicitud || {},
      subQuery: false,
      limit: consulta.limit,
      offset: consulta.offset,
      order: consulta.order || [['id_sala', 'DESC']],
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

  function obtenerSalaId(idsala) {
    return SalaModel.findOne({
      attributes: ["id_sala", "nombre", "cod_sala", "estado"],
      where: {
        id_sala: idsala,
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


  _app.dao.sala.obtenerSalas = obtenerSalas;
  _app.dao.sala.obtenerSalaId = obtenerSalaId;
};
