const fs = require('fs');
const path = require('path');

module.exports = (sequelize) => {
  const db = {
    models: {},
  };
  const dirModels = path.join(__dirname, 'models');

  fs.readdirSync(dirModels).forEach((dir) => {
    if (fs.statSync(`${dirModels}/${dir}`).isDirectory()) {
      const subDirModels = path.join(dirModels, dir);

      fs.readdirSync(subDirModels).forEach((file) => {
        const rutaArchivo = path.join(subDirModels, file);
        const modelo = sequelize.import(rutaArchivo);
        db.models[modelo.name] = modelo;
      });
    }
  });
  console.log('Cargando asociaciones .....');
  Object.keys(db.models).forEach((key) => {
    if (db.models[key].associate !== undefined) {
      db.models[key].associate(db.models);
    }
  });
  return db;
};
