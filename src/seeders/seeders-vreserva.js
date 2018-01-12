// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('reserva', [
      {
        fecha_reserva: '1980/01/01',
        hora_inicio: '10:00',
        hora_fin: '11:00',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_usuario: 1,
        fid_sala: 1,
      },
    ], {});
  },

  down() {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
