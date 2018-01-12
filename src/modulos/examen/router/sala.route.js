module.exports = (app) => {


  /**
   * @api {get} /public/sala/listar/:id_sala Obtener sala
   * @apiName Obtener sala
   * @apiGroup Sala
   * @apiDescription Para obtener un sala
   *
   * @apiParam {Number} id_sala Identificador del sala
   *
   * @apiSuccess {Number} id_sala Id de sala
   * @apiSuccess {String} email Correo electrónico del sala
   * @apiSuccess {String} sala Nombre de sala del sala
   * @apiSuccess {String} estado Estado del registro del sala
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *{
      "finalizado": true,
      "mensaje": "Obtención exitosa de salas.",
      "datos": {
          "count": 5,
          "rows": [
              {
                  "id_sala": 5,
                  "nombre": "SALA 5",
                  "cod_sala": "S-5",
                  "estado": "ACTIVO"
              },
              {
                  "id_sala": 4,
                  "nombre": "SALA 4",
                  "cod_sala": "S-4",
                  "estado": "ACTIVO"
              },
            ...
          ]
      }
  }
   *
   * @apiError No Content
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 204 No Content
   *     {
   *       "msg": "No existe el sala."
   *     }
   */
  app.apiPublic.get('/sala/listar', app.controller.sala.listarSala);

  /**
   * @api {get} /public/sala/listar/:id_usuario Obtener Sala
   * @apiName Obtener Sala
   * @apiGroup Sala
   * @apiDescription Para obtener un sala
   *
   * @apiParam {Number} id_sala Identificador de la sala
   *
   * @apiSuccess {Number} id_sala Id de sala
   * @apiSuccess {String} email Correo electrónico del sala
   * @apiSuccess {String} sala Nombre de sala del sala
   * @apiSuccess {String} estado Estado del registro del sala
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   {
        "finalizado": true,
        "mensaje": "Obtención exitosa del sala.",
        "datos": {
            "id_sala": 2,
            "nombre": "SALA 2",
            "cod_sala": "S-2",
            "estado": "ACTIVO"
        }
    }
   *
   */
  app.apiPublic.get('/sala/listar/:id_sala', app.controller.sala.listarSalaId);

  /**
    * @api {post} /public/sala/crear Registrar Sala
    * @apiName Registrar Sala
    * @apiGroup Sala
    * @apiDescription Para registrar un sala
    * Registrar un sala.
    *
    * @apiParam {String} nombre  de la sala
    * @apiParam {String} codigo de la sala
    *
    * @apiParamExample {json} Request-Example:
    {
    	"nombre": "SALA 6",
    	"cod_sala": "S-6"
    }
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    {
      "finalizado": true,
      "mensaje": "Creación de sala exitoso.",
      "datos": {
          "estado": "ACTIVO",
          "id_sala": 6,
          "nombre": "SALA 6",
          "cod_sala": "S-6",
          "_usuario_creacion": 1,
          "_fecha_modificacion": "2018-01-12T16:02:22.291Z",
          "_fecha_creacion": "2018-01-12T16:02:22.291Z",
          "_usuario_modificacion": null
      }
  }
  *
  *
  */
  app.apiPublic.post('/sala/crear', app.controller.sala.crearSala);

  /**
  * @api {put} /public/sala/modificar/:id_sala Actualizar sala
  * @apiName Actualizar Sala
  * @apiGroup Sala
  * @apiDescription Para actualizar una Sala
  * Actualizar una Sala.
  *
  * @apiParam {Number} id_sala Identificador de la Sala
  *
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  {
      "finalizado": true,
      "mensaje": "Modificación de sala exitoso.",
      "datos": {}
  }
  *
  */
  app.apiPublic.put('/sala/modificar/:id_sala', app.controller.sala.modificarSala);

  /**
    @apiVersion 1.0.0
    @apiGroup sala
    @apiName Eliminar Sala
    @api {delete} /sala/eliminar/:id_sala Dar de baja

    @apiParam (Parametro) {Numero} id Identificador del sala

    @apiDescription Eliminar para sala

    @apiSuccess (Respuesta) {Texto} finalizado Indica el estado del proceso solicitado
    @apiSuccess (Respuesta) {Texto} mensaje Mensaje a ser visualizado
    @apiSuccess (Respuesta) {Objeto} datos Datos del sala modificado

    @apiSuccessExample {json} Respuesta del Ejemplo:
    HTTP/1.1 200 OK
    {
        "finalizado": true,
        "mensaje": "Baja/Eliminacion de sala correcta.",
        "datos": {}
    }

    @apiSampleRequest off
  */
  app.apiPublic.delete('/sala/eliminar/:id_sala', app.controller.sala.eliminarSala);
};
