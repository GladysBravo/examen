const Sequelize = require('sequelize');
// import util from '../../../lib/util';

module.exports = (app) => {
  const _app = app;
  _app.dao.materia = {};

  const MateriaModel = app.src.db.models.materia;
  const DocenteModel = app.src.db.models.docente;

  function obtenerMaterias(consulta) {
    return MateriaModel.findAndCountAll({
      // attributes: ["id_materia", "nombres", "documento_identidad", "estado"],
      include: [{
        model: DocenteModel,
        as: 'docente',
        required: false,
      }],
      where: consulta.condicionSolicitud || {},
      subQuery: false,
      limit: consulta.limit,
      offset: consulta.offset,
      order: consulta.order || [['id_materia', 'ASC']],
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

  function obtenerMateriaId(id_materia) {
    return MateriaModel.findOne({
      // attributes: ["id_materia", "nombre", "cod_materia", "estado"],
      include: [{
        model: DocenteModel,
        as: 'docente',
        required: false,
      }],
      where: {
        id_materia
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


  _app.dao.materia.obtenerMaterias = obtenerMaterias;
  _app.dao.materia.obtenerMateriaId = obtenerMateriaId;
};
