/**
* Módulo que mapea las aulaS existentes, cada aula sólo debería estar
* registrada una vez en esta tabla.
*
* @module
*
*/

module.exports = (sequelize, DataType) => {
  const aula = sequelize.define('aula', {
    id_aula: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id de la aula',
    },
    nombre: {
      type: DataType.STRING(50),
      field: 'nombre',
      xlabel: 'Nombre',
      allowNull: false,
      validate: {
        len: { args: [1, 50], msg: 'El campo \'Nombre\' permite un mínimo de 1 caracter y un máximo de 50 caracteres' },
        is: { args: /^[A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]+$/i, msg: 'El campo \'Nombres\' permite sólo letras' },
      },
    },
    estado: {
      type: DataType.STRING(30),
      field: 'estado',
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: { args: [['ACTIVO', 'INACTIVO', 'ELIMINADO']], msg: 'El campo estado sólo permite valores: ACTIVO, INACTIVO o ELIMINADO.' },
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
        aula.hasMany(models.reserva_horario, { as: 'reserva_horario', foreignKey: { name: 'fid_aula', allowNull: true } });
      },

    },
    tableName: 'aula',
  });
  return aula;
};
