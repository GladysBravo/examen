module.exports = (app) => {

  /**
    * @api {post} /public/aulas/registrar  Registrar Aula
    * @apiName Registrar Aula
    * @apiGroup Aula
    * @apiDescription Para registrar Aula
    * Registrar  Aula.
    *
    * @apiParam {String} nombres  del(a) Aula
    *
    * @apiParamExample {json} Request-Example:
    {
    	"nombre": "aula A",
    }
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    {
      "finalizado": true,
      "mensaje": "Creación de aula exitoso.",
      "datos": {
          "estado": "ACTIVO",
          "id_aula": 1,
          "nombre": "aula A",
          "_usuario_creacion": 1,
          "_fecha_modificacion": "2018-03-03T16:12:10.476Z",
          "_fecha_creacion": "2018-03-03T16:12:10.476Z",
          "_usuario_modificacion": null
      }
  }
  *
  *
  */
  app.apiPublic.post('/aulas/registrar', app.controller.aula.registrarAula);

  /**
    * @api {post} /public/aulas/listar?order=&limit=&page=  Listar Aula
    * @apiName Listar Aula
    * @apiGroup Aula
    * @apiDescription Para listar un Aula
    * Listar un Aula.
    *
    * @apiParam (Query) {Texto} order (Opcional) Campo por el cual se ordenará el resultado
    * @apiParam (Query) {Numerico} limit (Opcional) Cantidad de resultados a obtener
    * @apiParam (Query) {Numerico} page (Opcional) Número de página de resultados
    *
    *
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    {
        "finalizado": true,
        "mensaje": "Obtención exitosa de aulas.",
        "datos": {
            "count": 1,
            "rows": [
                {
                    "id_aula": 1,
                    "nombre": "aula A",
                    "estado": "ACTIVO",
                    "_usuario_creacion": 1,
                    "_usuario_modificacion": null,
                    "_fecha_creacion": "2018-03-03T16:12:10.476Z",
                    "_fecha_modificacion": "2018-03-03T16:12:10.476Z"
                }
            ]
        }
    }
  *
  *
  */
  app.apiPublic.get('/aulas/listar', app.controller.aula.listarAula);

  /**
   * @api {get} /public/aulas/listar/:id_aula Obtener Aula
   * @apiName Obtener Aula
   * @apiGroup Aula
   * @apiDescription Para obtener un Aula
   *
   * @apiParam {Number} id_aula Identificador del Aula
   *
   * @apiSuccess {Number} id_aula Id de Aula
   * @apiSuccess {String} nombres Nombre del Aula
   * @apiSuccess {String} estado Estado del registro del Aula
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   {
       "finalizado": true,
       "mensaje": "Obtención exitosa del aula.",
       "datos": {
           "id_aula": 1,
           "nombre": "aula A",
           "estado": "ACTIVO",
           "_usuario_creacion": 1,
           "_usuario_modificacion": null,
           "_fecha_creacion": "2018-03-03T16:12:10.476Z",
           "_fecha_modificacion": "2018-03-03T16:12:10.476Z"
       }
   }
   *
   * @apiError No Content
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 204 No Content
   *     {
   *       "msg": "No existe el registro."
   *     }
   */
  app.apiPublic.get('/aulas/listar/:id_aula', app.controller.aula.listarAulaId);

};
