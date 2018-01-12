const Sequelize = require('sequelize');
// import util from '../../../lib/util';

module.exports = (app) => {
  const _app = app;
  _app.dao.usuario = {};

  const UsuarioModel = app.src.db.models.usuario;

  function obtenerUsuarios(consulta) {
    return UsuarioModel.findAndCountAll({
      attributes: ["id_usuario", "email", "usuario", "estado"],
      where: consulta.condicionSolicitud || {},
      subQuery: false,
      limit: consulta.limit,
      offset: consulta.offset,
      order: consulta.order || [['usuario', 'DESC']],
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

  function obtenerUsuarioId(idUsuario) {
    return UsuarioModel.findOne({
      attributes: ["id_usuario", "email", "usuario", "estado"],
      where: {
        id_usuario: idUsuario,
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


  _app.dao.usuario.obtenerUsuarios = obtenerUsuarios;
  _app.dao.usuario.obtenerUsuarioId = obtenerUsuarioId;
};
