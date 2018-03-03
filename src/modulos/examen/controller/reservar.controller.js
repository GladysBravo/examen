module.exports = (app) => {
  const _app = app;
  _app.controller.reservar = {};
  const reservarController = _app.controller.reservar;

  const sequelize = app.src.db.sequelize;
  const util = app.src.lib.util;

  const ReservaHorarioModel = app.src.db.models.reserva_horario;
  const AulaModel = app.src.db.models.aula;
  const MateriaModel = app.src.db.models.materia;

  reservarController.registrarReservaHorario = (req, res) => {
    // necesitamos rango de horas
    /*
    hora_inicio = '11:00',
    hora_fin = '12:00',
    fid_aula = 1,
    fid_materia = 2
    */
    const reservaHorarioCrear = req.body;

    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return AulaModel.findById(req.body.fid_aula, tr)
      .then((respAula) => {
        if (!respAula) throw new Error('La aula no esta Registrada.');
        return MateriaModel.findById(req.body.fid_materia, tr)
      })
      .then((respMateria) => {
        if (!respMateria) throw new Error('La Materia no se encuentra Registrado.');
        console.log('-------------------------------', req.body.hora_inicio);
        return ReservaHorarioModel.findOne({
          where: {
            // hora_inicio: req.body.hora_inicio,
            // hora_fin: {
            $or: [
              {
                hora_inicio: {
                  $lte: req.body.hora_inicio, //<=
                  // $gte: req.body.hora_fin
                }
              },
              {
                hora_fin: {
                  // $gte: req.body.hora_inicio,
                  $lte: req.body.hora_fin
                },
              }
            ],
            $and: {
              $or: [
                {
                  hora_inicio: {
                    // $lte: req.body.hora_inicio, //<=
                    $gte: req.body.hora_fin
                  }
                },
                {
                  hora_fin: {
                    $gte: req.body.hora_inicio,
                    // $lte: req.body.hora_fin
                  },
                }
              ],
            },
            // },
            // fid_usuario: req.body.fid_usuario,
            fid_aula: req.body.fid_aula,
            fid_materia: req.body.fid_materia,
            estado: {
              $ne: 'CANCELADO',
            }
          }
        })
      })
      .then((respReserva) => {
        if (respReserva) throw new Error('La existe la reserva en ese horario de la aula.');
        reservaHorarioCrear._usuario_creacion = 1;
        return ReservaHorarioModel.create(reservaHorarioCrear, tr);
      })
      .then((reservaCreado) => {
        t.commit();
        return res.status(201).json({
          finalizado: true,
          mensaje: 'Creación de reservar exitoso.',
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

  // reservarController.cancelarreservar = (req, res) => {
  //   const reservarModificar = {};
  //   // necesitamos fecha y rango de horas
  //   /*
  //   id_reservar : 1 ,
  //   estado = 'CANCELADO'
  //   */
  //   const reservarCrear = req.body;
  //
  //   sequelize.transaction().then((t)=> {
  //     const tr = { transaction: t };
  //     return reservarModel.findById(req.params.id_reservar, tr)
  //     .then((respReserva) => {
  //       if (!respReserva) throw new Error('La reservar no esta Registrado.');
  //       reservarModificar._usuario_modificacion = 1;
  //       reservarModificar.estado = req.query.estado;
  //       return respReserva.updateAttributes(reservarModificar, tr)
  //     })
  //     .then((reservaCreado) => {
  //       t.commit();
  //       return res.status(201).json({
  //         finalizado: true,
  //         mensaje: 'reservar cancelado exitosamente.',
  //         datos: {},
  //       });
  //     })
  //     .catch((error) => {
  //       t.rollback();
  //       return res.status(412).json({
  //         finalizado: false,
  //         mensaje: error.message,
  //         datos: {},
  //       });
  //     });
  //   })
  // };
  //
  // reservarController.listarreservars = (req, res) => {
  //   const consulta = util.formarConsulta(req.query, app.src.db.models.reservar, app.src.db.models, 2);
  //   return app.dao.reservar.obtenerSolicitudes(consulta)
  //   .then((pSolicitudes) => {
  //     return res.json({
  //       finalizado: true,
  //       mensaje: 'Obtención exitosa de salas.',
  //       datos: pSolicitudes,
  //     });
  //   })
  //   .catch((pError) => {
  //     console.log('\n\nRevisando el error', pError);
  //     res.status(412).json({
  //       finalizado: false,
  //       mensaje: pError.message,
  //       datos: {},
  //     });
  //   });
  // };
};
