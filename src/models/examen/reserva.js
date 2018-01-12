
module.exports = (sequelize, DataType) => {
  const reserva = sequelize.define('reserva', {
    id_reserva: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id de la reserva',
    },
    fecha_reserva: {
      type: DataType.DATEONLY,
      field: 'fecha_reserva',
      xlabel: 'Fecha de reserva',
      allowNull: false,
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
        reserva.belongsTo(models.usuario, { as: 'usuario', foreignKey: { name: 'fid_usuario', allowNull: true } });
        reserva.belongsTo(models.sala, { as: 'sala', foreignKey: { name: 'fid_sala', allowNull: true } });
      },
    },
    tableName: 'reserva',
  });

  return reserva;
};
