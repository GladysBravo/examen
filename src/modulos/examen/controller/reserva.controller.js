module.exports = (app) => {
  const _app = app;
  _app.controller.reserva = {};
  const reservaController = _app.controller.reserva;

  const sequelize = app.src.db.sequelize;
  const util = app.src.lib.util;

  const ReservaModel = app.src.db.models.reserva;
  const SalaModel = app.src.db.models.sala;
  const UsuarioModel = app.src.db.models.usuario;

  reservaController.crearReserva = (req, res) => {
    // necesitamos fecha y rango de horas
    /*
    fecha_reserva = '12/12/2018',
    hora_inicio = '11:00',
    hora_fin = '12:00',
    fid_sala = 1,
    fid_usuario = 1
    */
    const reservaCrear = req.body;

    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return SalaModel.findById(req.body.fid_sala, tr)
      .then((respSala) => {
        if (!respSala) throw new Error('La sala no esta Registrada.');
        return UsuarioModel.findById(req.body.fid_usuario, tr)
      })
      .then((respUsuario) => {
        if (!respUsuario) throw new Error('El usuario no se encuentra Registrado.');
        console.log('-------------------------------');
        return ReservaModel.findOne({
          where: {
            fecha_reserva: req.body.fecha_reserva,
            hora_inicio: req.body.hora_inicio,
            hora_fin: req.body.hora_fin,
            // fid_usuario: req.body.fid_usuario,
            fid_sala: req.body.fid_sala,
            estado: {
              $ne: 'CANCELADO',
            }
          }
        })
      })
      .then((respReserva) => {
        if (respReserva) throw new Error('La existe la Reserva de la sala.');        
        reservaCrear._usuario_creacion = 1;
        return ReservaModel.create(reservaCrear, tr);
      })
      .then((reservaCreado) => {
        t.commit();
        return res.status(201).json({
          finalizado: true,
          mensaje: 'Creación de reserva exitoso.',
          datos: {},
        });
      })
      .catch((error) => {
        t.rollback();
        return res.status(412).json({
          finalizado: false,
          mensaje: error.message,
          datos: {},
        });
      });
    })
  };

  reservaController.cancelarReserva = (req, res) => {
    const reservaModificar = {};
    // necesitamos fecha y rango de horas
    /*
    id_reserva : 1 ,
    estado = 'CANCELADO'
    */
    const reservaCrear = req.body;

    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return ReservaModel.findById(req.params.id_reserva, tr)
      .then((respReserva) => {
        if (!respReserva) throw new Error('La Reserva no esta Registrado.');
        reservaModificar._usuario_modificacion = 1;
        reservaModificar.estado = req.query.estado;
        return respReserva.updateAttributes(reservaModificar, tr)
      })
      .then((reservaCreado) => {
        t.commit();
        return res.status(201).json({
          finalizado: true,
          mensaje: 'Reserva cancelado exitosamente.',
          datos: {},
        });
      })
      .catch((error) => {
        t.rollback();
        return res.status(412).json({
          finalizado: false,
          mensaje: error.message,
          datos: {},
        });
      });
    })
  };

  reservaController.listarReservas = (req, res) => {
    const consulta = util.formarConsulta(req.query, app.src.db.models.reserva, app.src.db.models, 2);
    return app.dao.reserva.obtenerSolicitudes(consulta)
    .then((pSolicitudes) => {
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa de salas.',
        datos: pSolicitudes,
      });
    })
    .catch((pError) => {
      console.log('\n\nRevisando el error', pError);
      res.status(412).json({
        finalizado: false,
        mensaje: pError.message,
        datos: {},
      });
    });
  };
};
