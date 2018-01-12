const params = require('./config.json');
const logger = require('../lib/logger');

module.exports = () => {
  let env = process.env.NODE_ENV;

  if (!env) {
    env = 'development';
  }

  if (!params.hasOwnProperty(env)) {
    env = 'development';
  }

  const config = {
    database: {
      name: params[env].database,
      username: params[env].username,
      password: params[env].password,
      timezone: '-04:00',
      lang: 'es',
      params: {
        dialect: params[env].dialect,
        port: params[env].port,
        host: params[env].host,
        sync: { force: process.env.FORCE || false,
        },
        logging: (sql) => {
          if (env === 'development') {
            logger.log('info', `[${new Date()}] ${sql}`);
          }
        },
        define: {
          underscored: true,
        },
      },
    },
    api: {
      main: '/api/v1/',
      crud: 'rest/',
      public: '/public',
    },
    segip: {
      url: 'http://192.168.25.141',
      path: '/fake/segip/v2/',
      credenciales: {
        apikey: '383a0f19857f4dde885271725bdc1f20',
      },
      tokenKong: 'Bearer <-- solicitar el token a interoperabilidad -->',
    },
     // configuracion con jwt poner una palabra secreta segura
    jwtSecret: 'examen-2017',
    jwtSession: { session: false },
    puerto: 4000,
  };

  return config;
};
