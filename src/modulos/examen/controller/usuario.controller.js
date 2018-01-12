module.exports = (app) => {
  const _app = app;
  _app.controller.usuario = {};
  const usuarioController = _app.controller.usuario;
  const UsuarioModel = app.src.db.models.usuario;
  const util = app.src.lib.util;
  const sequelize = app.src.db.sequelize;

  usuarioController.crearUsuario = (req, res) => {
    const usuarioCrear = req.body;

    sequelize.transaction().then((t)=> {
      const tr = { transaction: t };
      return UsuarioModel.findOne({
        where: {
          email: req.body.email,
        }
      }, tr)
      .then((respuestaUsuario) => {
        if (respuestaUsuario) throw new Error('El Usuario ya esta Registrada.');
        const usuario = req.body.email.split('@');
        usuarioCrear._usuario_creacion = 1;
        usuarioCrear.usuario = usuario[0];
        usuarioCrear.estado = 'ACTIVO';
        return UsuarioModel.create(usuarioCrear, tr)
      })
      .then((usuarioCreado) => {
        t.commit();
        return res.status(201).json({
          finalizado: true,
          mensaje: 'Creación de usuario exitoso.',
          datos: usuarioCreado,
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

  usuarioController.listarUsuarios = (req, res) => {

    // if (!req.query.order) {
    //   req.query.order = 'id_usuario DESC';
    // }
    // const query = util.paginar(req.query);

    const consulta = util.formarConsulta(req.query, app.src.db.models.usuario, app.src.db.models, 1);
    return app.dao.usuario.obtenerUsuarios(consulta)
    .then((pSolicitudes) => {
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa de usuarios.',
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

  usuarioController.listarUsuarioId = (req, res) => {
    return app.dao.usuario.obtenerUsuarioId(req.params.id_usuario)
    .then((respuesta) => {
      if (!respuesta) throw new Error('No existe el registro.');
      return respuesta;
    })
    .then((pSolicitudes) => {
      console.log('respuesta solicitud IDD ', pSolicitudes);
      return res.json({
        finalizado: true,
        mensaje: 'Obtención exitosa del usuario.',
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

  usuarioController.eliminarUsuario = (req, res) => {
    const idUsuario = req.params.id_usuario;
    const datos = {
      _usuario_modificacion: 1,
      estado: 'ELIMINADO',
    };

    sequelize.transaction().then((t) => {
      const transaccion = {
        transaction: t,
      };
      UsuarioModel.findOne({
        where: {
          id_usuario: idUsuario,
          estado: 'ACTIVO',
        },
      }, transaccion)
      .then((respUsuario) => {
        if (!respUsuario) throw new Error('El usuario no se encuentra registrado en el sistema ó no esta activo.');

        return respUsuario.updateAttributes(datos, transaccion);
      })
      .then(() => {
        t.commit();
        return res.status(200).json({
          finalizado: true,
          mensaje: 'Baja/Eliminacion de usuario correcta.',
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
