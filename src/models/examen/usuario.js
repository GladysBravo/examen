/**
 * Módulo par usuario
 *
 * @module
 *
 **/
import crypto from 'crypto';


module.exports = (sequelize, DataType) => {
  const usuario = sequelize.define('usuario', {
    id_usuario: {
      type: DataType.INTEGER,
      field: 'id_usuario',
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    email: {
      type: DataType.STRING(100),
      field: 'email',
      xlabel: 'Correo electrónico',
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { args: true, msg: 'El campo \'Correo Electrónico\' no tiene el formato correcto' },
        len: { args: [4, 100], msg: 'El campo \'Correo Electrónico\' permite un mínimo de 4 caracteres y un máximo de 100 caracteres' },
      },
    },
    usuario: {
      type: DataType.STRING(100),
      field: 'usuario',
      xlabel: 'Nombre de usuario',
      allowNull: false,
      // unique: true,
      validate: {
        len: { args: [3, 100], msg: 'El campo \'Nombre de Usuario\' permite un mínimo de 3 caracteres y un máximo de 100 caracteres' },
      },
    },
    contrasena: {
      type: DataType.STRING,
      field: 'contrasena',
      xlabel: 'Contraseña',
      allowNull: false,
      defaultValue: '',
    },
    observaciones: {
      type: DataType.STRING(100),
      field: 'observaciones',
      xlabel: 'Observaciones',
      validate: {
        len: { args: [0, 100], msg: 'El campo \'Observaciones\' permite un máximo de 100 caracteres' },
      },
    },
    token: {
      type: DataType.STRING(50),
      field: 'token',
      xlabel: 'Certificado digital',
      allowNull: true,
      validate: {
        len: { args: [0, 50], msg: 'El campo \'Certificado digital\' permite un máximo de 50 caracteres.' },
        is: { args: /^([A-Z|a-z|0-9| ]|)+$/i, msg: 'El campo \'Certificado digital\' sólo permite letras sin tíldes.' },
      },
    },
    estado: {
      type: DataType.STRING(30),
      field: 'estado',
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: {
          args: [['ACTIVO', 'ELIMINADO']],
          msg: 'El campo estado sólo permite valores: ACTIVO o ELIMINADO.',
        },
      },
    },
    _usuario_creacion: {
      type: DataType.STRING(50),
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.STRING(50),
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
      allowNull: true,
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    classMethods: {
      // Creando asociaciones para la entidad
      associate: (models) => {
        usuario.hasMany(models.reserva, { as: 'reserva', foreignKey: { name: 'fid_usuario', allowNull: true } });

      },
      tableName: 'usuario',
    },
  });

  // Hash password usuario MD5 para eventos de actualizacion y creacion
  const hashPasswordHook = (instance) => {
    if (!instance.changed('contrasena')) return false;
    if (instance.get('contrasena').length < 8) {
      throw new Error('La contraseña debe contener al menos 8 caracteres.');
    }
    const contrasena = instance.get('contrasena');
    const password = crypto.createHash('md5').update(contrasena).digest('hex');
    instance.set('contrasena', password);
  };
  usuario.beforeCreate((usuario, options) => {
    hashPasswordHook(usuario);
    usuario.usuario = usuario.usuario.toLowerCase();
  });

  usuario.beforeUpdate(hashPasswordHook);
  return usuario;
};
