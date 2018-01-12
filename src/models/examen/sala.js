
module.exports = (sequelize, DataType) => {
  const sala = sequelize.define('sala', {
    id_sala: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id de la sala',
    },
    nombre: {
      type: DataType.STRING(50),
      allowNull: false,    
    },
    cod_sala: {
      type: DataType.STRING(20),
      allowNull: false,
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
      type: DataType.INTEGER,
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    classMethods: {
      // Creando asociaciones para la entidad
      associate: (models) => {
        sala.hasMany(models.reserva, { as: 'reserva', foreignKey: { name: 'fid_sala', allowNull: true } });
      },
    },
    tableName: 'sala',
  });

  return sala;
};
