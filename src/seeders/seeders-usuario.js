// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('usuario', [
      {
        email: 'admin',
        usuario: 'admin',
        contrasena: '672caf27f5363dc833bda5099775e891',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        email: 'gbravo@hotmail.com',
        usuario: 'gbravo',
        contrasena: '672caf27f5363dc833bda5099775e891',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
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
