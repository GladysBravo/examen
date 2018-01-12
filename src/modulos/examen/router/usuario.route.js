module.exports = (app) => {


  /**
   * @api {get} /public/usuario/listar?order=&limit=&page= Lista
   * @apiName ListarUsuarios
   * @apiGroup Usuarios
   * @apiDescription Para devolver la lista de Usuarios
   *
   * @apiParam (Query) {Texto} order (Opcional) Campo por el cual se ordenará el resultado
   * @apiParam (Query) {Numerico} limit (Opcional) Cantidad de resultados a obtener
   * @apiParam (Query) {Numerico} page (Opcional) Número de página de resultados
   *
   * @apiSuccess {Number} id_usuario Id de usuario
   * @apiSuccess {String} email Correo electrónico del usuario
   * @apiSuccess {String} usuario Nombre de usuario del usuario
   * @apiSuccess {String} estado Estado del registro del usuario
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   *  {
        "finalizado": true,
        "mensaje": "Obtención exitosa de usuarios.",
        "datos": {
            "count": 2,
            "rows": [
                {
                    "id_usuario": 1,
                    "email": "gbravo@hotmail.com",
                    "usuario": "gbravo",
                    "estado": "ACTIVO"
                },
                {
                    "id_usuario": 2,
                    "email": "gbravo@gmail.com",
                    "usuario": "gbravo",
                    "estado": "ELIMINADO"
                }
            ]
        }
    }
   */
  app.apiPublic.get('/usuario/listar', app.controller.usuario.listarUsuarios);

  /**
   * @api {get} /public/usuario/listar/:id_usuario Obtener Usuario
   * @apiName Obtener Usuario
   * @apiGroup Usuarios
   * @apiDescription Para obtener un usuario
   *
   * @apiParam {Number} id_usuario Identificador del usuario
   *
   * @apiSuccess {Number} id_usuario Id de usuario
   * @apiSuccess {String} email Correo electrónico del usuario
   * @apiSuccess {String} usuario Nombre de usuario del usuario
   * @apiSuccess {String} estado Estado del registro del usuario
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *{
        "finalizado": true,
        "mensaje": "Obtención exitosa del usuario.",
        "datos": {
            "id_usuario": 1,
            "email": "gbravo@hotmail.com",
            "usuario": "gbravo",
            "estado": "ACTIVO"
        }
    }
   *
   * @apiError No Content
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 204 No Content
   *     {
   *       "msg": "No existe el usuario."
   *     }
   */
  app.apiPublic.get('/usuario/listar/:id_usuario', app.controller.usuario.listarUsuarioId);

  /**
    * @api {post} /public/usuario/crear Registrar Usuarios
    * @apiName Registrar Usuarios
    * @apiGroup Usuarios
    * @apiDescription Para registrar un usuario
    * Registrar un usuario.
    *
    * @apiParam {String} email Email del usuario
    * @apiParam {String} contrasena Contraseña del usuario
    *
    * @apiParamExample {json} Request-Example:
    {
    	"email": "gbravo@gmail.com",
    	"contrasena": "12345678"
    }
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    {
        "finalizado": true,
        "mensaje": "Creación de usuario exitoso.",
        "datos": {
            "id_usuario": 2,
            "email": "gbravo@gmail.com",
            "contrasena": "25d55ad283aa400af464c76d713c07ad",
            "_usuario_creacion": "1",
            "usuario": "gbravo",
            "estado": "ACTIVO",
            "_fecha_modificacion": "2018-01-12T15:28:58.037Z",
            "_fecha_creacion": "2018-01-12T15:28:58.037Z",
            "observaciones": null,
            "token": null,
            "_usuario_modificacion": null
        }
    }
  *
  *
  */
  app.apiPublic.post('/usuario/crear', app.controller.usuario.crearUsuario);

  /**
    @apiVersion 1.0.0
    @apiGroup Usuario
    @apiName Eliminar usuarios
    @api {delete} /usuario/eliminar/:id_usuario Dar de baja

    @apiParam (Parametro) {Numero} id Identificador del usuario

    @apiDescription Eliminar para usuario

    @apiSuccess (Respuesta) {Texto} finalizado Indica el estado del proceso solicitado
    @apiSuccess (Respuesta) {Texto} mensaje Mensaje a ser visualizado
    @apiSuccess (Respuesta) {Objeto} datos Datos del usuario modificado

    @apiSuccessExample {json} Respuesta del Ejemplo:
    HTTP/1.1 200 OK
    {
        "finalizado": true,
        "mensaje": "Baja/Eliminacion de usuario correcta.",
        "datos": {}
    }

    @apiSampleRequest off
  */
  app.apiPublic.delete('/usuario/eliminar/:id_usuario', app.controller.usuario.eliminarUsuario);
};
