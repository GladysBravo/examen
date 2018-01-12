// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('sala', [
      {
        nombre: 'SALA 1',
        cod_sala: 'S-1',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        nombre: 'SALA 2',
        cod_sala: 'S-2',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        nombre: 'SALA 3',
        cod_sala: 'S-3',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        nombre: 'SALA 4',
        cod_sala: 'S-4',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        nombre: 'SALA 5',
        cod_sala: 'S-5',
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
