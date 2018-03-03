module.exports = (app) => {
  const _app = app;
  _app.controller.aula = {};
  const aulaController = _app.controller.aula;
  const AulaModel = app.src.db.models.aula;
  const util = app.src.lib.util;
  const sequelize = app.src.db.sequelize;

  aulaController.registrarAula = (req, res) => {
    const aulaCrear = req.body;
    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return AulaModel.findOne({
        where: {
          nombre: req.body.nombre,
        }
      }, tr)
      .then((respuestaaula) => {
        if (respuestaaula) throw new Error('El aula ya esta Registrada.');
        aulaCrear._usuario_creacion = 1;
        return AulaModel.create(aulaCrear, tr)
      })
      .then((aulaCreado) => {
        t.commit();
        return res.status(201).json({
          finalizado: true,
          mensaje: 'Creación de aula exitoso.',
          datos: aulaCreado,
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

  aulaController.listarAula = (req, res) => {
    const consulta = util.formarConsulta(req.query, app.src.db.models.aula, app.src.db.models, 1);
    return app.dao.aula.obtenerAulas(consulta)
    .then((pSolicitudes) => {
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa de aulas.',
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

  aulaController.listarAulaId = (req, res) => {
    return app.dao.aula.obtenerAulaId(req.params.id_aula)
    .then((respuesta) => {
      if (!respuesta) throw new Error('No existe el registro.');
      return respuesta;
    })
    .then((pSolicitudes) => {
      console.log('respuesta solicitud IDD ', pSolicitudes);
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa del aula.',
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
