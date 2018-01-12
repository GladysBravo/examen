const Sequelize = require('sequelize');
// import util from '../../../lib/util';

module.exports = (app) => {
  const _app = app;
  _app.dao.reserva = {};

  // const sequelize = app.src.db.sequelize;

  const UsuarioModel = app.src.db.models.usuario;
  const SalaModel = app.src.db.models.sala;
  const ReservaModel = app.src.db.models.reserva;

  // SOLICITUD DE CONDUCTOR
  function obtenerSolicitudes(consulta) {

    return ReservaModel.findAndCountAll({
      attributes: ["id_reserva", "fecha_reserva", "hora_inicio", "hora_fin", "estado", "fid_usuario", "fid_sala"],
      where: consulta.condicionSolicitud || {},
      include: [
        {
          attributes: ["id_usuario", "email", "usuario", "estado"],
          model: UsuarioModel,
          as: 'usuario',
          where: consulta.condicionUsuario || {},
          required: false,
        },
        {
          attributes: ["id_sala", "nombre", "cod_sala", "estado"],
          model: SalaModel,
          as: 'sala',
          required: false,
        },
      ],
      subQuery: false,
      limit: consulta.limit,
      offset: consulta.offset,
      order: consulta.order || [['id_reserva', 'DESC']],
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

  function obtenerSolicitudId(idSolicitud) {
    return SolicitudModel.findOne({
      where: {
        id_solicitud: idSolicitud,
      },
      include: [
        {
          model: UsuarioModel,
          as: 'usuario',
          // where: consulta.condicionDeposito, //??
          include: [
            {
              model: PersonaModel,
              as: 'persona',
              include: [{ model: LicenciaModel, as: 'licencia' , where: { fid_solicitud: idSolicitud } },
                        { model: DireccionModel, as: 'direccion', where: { fid_solicitud: idSolicitud } },
                        { model: AntecedenteModel, as: 'antecedente' }]
            },
          ],
        },
        {
          model: TransicionModel,
          as: 'transiciones',
          include: [{ model: EstadoModel, as: 'estado' }],
        },
      ],
    })
    .then((respuesta) => {
      return respuesta;
    })
    .catch((pError) => {
      console.log('Error en la obtencion de la solicitud', pError);
      return pError;
    });
  }


  _app.dao.reserva.obtenerSolicitudes = obtenerSolicitudes;
  _app.dao.reserva.obtenerSolicitudId = obtenerSolicitudId;
};
