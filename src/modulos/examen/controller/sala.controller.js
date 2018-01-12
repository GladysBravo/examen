module.exports = (app) => {
  const _app = app;
  _app.controller.sala = {};
  const salaController = _app.controller.sala;
  const SalaModel = app.src.db.models.sala;
  const util = app.src.lib.util;
  const sequelize = app.src.db.sequelize;

  salaController.crearSala = (req, res) => {
    const salaCrear = req.body;

    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return SalaModel.findOne({
        where: {
          nombre: req.body.nombre,
          cod_sala: req.body.cod_sala,
        }
      }, tr)
      .then((respuestasala) => {
        if (respuestasala) throw new Error('El sala ya esta Registrada.');
        salaCrear._usuario_creacion = 1;
        return SalaModel.create(salaCrear, tr)
      })
      .then((salaCreado) => {
        t.commit();
        return res.status(201).json({
          finalizado: true,
          mensaje: 'Creación de sala exitoso.',
          datos: salaCreado,
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

  salaController.modificarSala = (req, res) => {
    const idSala = req.params.id_sala;
    const salaCrear = req.body;
    salaCrear._usuario_modificacion = 1;

    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return SalaModel.findOne({
        where: {
          id_sala: idSala,
          estado: 'ACTIVO',
        }
      }, tr)
      .then((respuestasala) => {
        if (respuestasala == null) throw new Error('El sala no esta Disponible.');
        console.log('\n\n\n\n respuestasala', respuestasala);
        return respuestasala.updateAttributes(salaCrear, tr);
      })
      .then((salaModificado) => {
        t.commit();
        return res.status(200).json({
          finalizado: true,
          mensaje: 'Modificación de sala exitoso.',
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

  salaController.listarSala = (req, res) => {
    const consulta = util.formarConsulta(req.query, app.src.db.models.sala, app.src.db.models, 1);
    return app.dao.sala.obtenerSalas(consulta)
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

  salaController.listarSalaId = (req, res) => {
    return app.dao.sala.obtenerSalaId(req.params.id_sala)
    .then((respuesta) => {
      if (!respuesta) throw new Error('No existe el registro.');
      return respuesta;
    })
    .then((pSolicitudes) => {
      console.log('respuesta solicitud IDD ', pSolicitudes);
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa del sala.',
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

  salaController.eliminarSala = (req, res) => {
    const idsala = req.params.id_sala;
    const datos = {
      _usuario_modificacion  : 1,
      estado: 'ELIMINADO',
    };

    sequelize.transaction().then((t) => {
      const transaccion = {
        transaction: t,
      };
      SalaModel.findOne({
        where: {
          id_sala: idsala,
          estado: 'ACTIVO',
        },
      }, transaccion)
      .then((respsala) => {
        if (!respsala) throw new Error('El sala no se encuentra registrado en el sistema ó no esta activo.');

        return respsala.updateAttributes(datos, transaccion);
      })
      .then(() => {
        t.commit();
        return res.status(200).json({
          finalizado: true,
          mensaje: 'Baja/Eliminacion de sala correcta.',
          datos: {},
        });
      })
      .catch((pError) => {
        console.log('\n\n\n\n eroor', pError);
        t.rollback();
        res.status(412).json({
          finalizado: false,
          mensaje: pError.message,
          datos: {},
        });
      });
    });
  };
};
