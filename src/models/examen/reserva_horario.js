
module.exports = (sequelize, DataType) => {
  const reserva_horario = sequelize.define('reserva_horario', {
    id_reserva_horario: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id de la reserva_horario',
    },
    hora_inicio: {
      type: DataType.STRING(10),
      field: 'hora_inicio',
      allowNull: false,
    },
    hora_fin: {
      type: DataType.STRING(10),
      field: 'hora_fin',
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
          args: [['ACTIVO', 'CANCELADO']],
          msg: 'El campo estado sólo permite valores: ACTIVO o CANCELADO.',
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
        reserva_horario.belongsTo(models.materia, { as: 'materia', foreignKey: { name: 'fid_materia', allowNull: true } });
        reserva_horario.belongsTo(models.aula, { as: 'aula', foreignKey: { name: 'fid_aula', allowNull: true } });
      },
    },
    tableName: 'reserva_horario',
  });

  return reserva_horario;
};
