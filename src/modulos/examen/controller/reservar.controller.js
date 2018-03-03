module.exports = (app) => {
  const _app = app;
  _app.controller.reservar = {};
  const reservarController = _app.controller.reservar;

  const sequelize = app.src.db.sequelize;
  const util = app.src.lib.util;

  const ReservaHorarioModel = app.src.db.models.reserva_horario;
  const AulaModel = app.src.db.models.aula;
  const MateriaModel = app.src.db.models.materia;
  const DocenteModel = app.src.db.models.docente;

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


  reservarController.listarReservarHorario = (req, res) => {
    const consulta = util.formarConsulta(req.query, app.src.db.models.reserva_horario, app.src.db.models, 2);
    return obtenerSolicitudes(consulta)
    .then((pSolicitudes) => {
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa.',
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

  function obtenerSolicitudes(consulta) {
    console.log('-------------------------', consulta);
    return ReservaHorarioModel.findAndCountAll({
      // where: consulta.condicionSolicitud || {},
      include: [
        {
          model: AulaModel,
          as: 'aula',
          // where: consulta.condicionAula || {},
          required: false,
        },
        {
          model: MateriaModel,
          as: 'materia',
          required: false,
          include: [
            {
              model: DocenteModel,
              as: 'docente',
              required: false,
            },
          ],
        },
      ],
      subQuery: false,
      limit: consulta.limit,
      offset: consulta.offset,
      order: consulta.order || [['id_reserva_horario', 'ASC']],
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
};
