module.exports = (app) => {
  const _app = app;
  _app.controller.docente = {};
  const docenteController = _app.controller.docente;
  const DocenteModel = app.src.db.models.docente;
  const util = app.src.lib.util;
  const sequelize = app.src.db.sequelize;

  docenteController.registrarDocente = (req, res) => {
    const docenteCrear = req.body;
    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return DocenteModel.findOne({
        where: {
          documento_identidad: req.body.documento_identidad,
        }
      }, tr)
      .then((respuestadocente) => {
        if (respuestadocente) throw new Error('El docente ya esta Registrada.');
        docenteCrear._usuario_creacion = 1;
        return DocenteModel.create(docenteCrear, tr)
      })
      .then((docenteCreado) => {
        t.commit();
        return res.status(201).json({
          finalizado: true,
          mensaje: 'Creación de docente exitoso.',
          datos: docenteCreado,
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

  docenteController.listarDocente = (req, res) => {
    const consulta = util.formarConsulta(req.query, app.src.db.models.docente, app.src.db.models, 1);
    return app.dao.docente.obtenerDocentes(consulta)
    .then((pSolicitudes) => {
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa de docentes.',
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

  docenteController.listarDocenteId = (req, res) => {
    
    return app.dao.docente.obtenerDocenteId(req.params.id_docente)
    .then((respuesta) => {
      if (!respuesta) throw new Error('No existe el registro.');
      return respuesta;
    })
    .then((pSolicitudes) => {
      console.log('respuesta solicitud IDD ', pSolicitudes);
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa del docente.',
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
