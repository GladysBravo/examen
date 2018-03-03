module.exports = (app) => {
  const _app = app;
  _app.controller.materia = {};
  const materiaController = _app.controller.materia;

  const MateriaModel = app.src.db.models.materia;
  const util = app.src.lib.util;
  const sequelize = app.src.db.sequelize;

  materiaController.registrarMateria = (req, res) => {
    const materiaCrear = req.body;
    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return MateriaModel.findOne({
        where: {
          nombre: req.body.nombre,
        }
      }, tr)
      .then((respuestamateria) => {
        if (respuestamateria) throw new Error('El materia ya esta Registrada.');
        materiaCrear._usuario_creacion = 1;
        return MateriaModel.create(materiaCrear, tr)
      })
      .then((materiaCreado) => {
        t.commit();
        return res.status(201).json({
          finalizado: true,
          mensaje: 'Creación de materia exitoso.',
          datos: materiaCreado,
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

  materiaController.listarMateria = (req, res) => {
    const consulta = util.formarConsulta(req.query, app.src.db.models.materia, app.src.db.models, 1);
    return app.dao.materia.obtenerMaterias(consulta)
    .then((pSolicitudes) => {
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa de materias.',
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

  materiaController.listarMateriaId = (req, res) => {
    return app.dao.materia.obtenerMateriaId(req.params.id_materia)
    .then((respuesta) => {
      if (!respuesta) throw new Error('No existe el registro.');
      return respuesta;
    })
    .then((pSolicitudes) => {
      console.log('respuesta solicitud IDD ', pSolicitudes);
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa del materia.',
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
