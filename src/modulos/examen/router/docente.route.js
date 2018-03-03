module.exports = (app) => {

  /**
    * @api {post} /public/docentes/registrar  Registrar Docente
    * @apiName Registrar Docente
    * @apiGroup Docente
    * @apiDescription Para registrar un Docente
    * Registrar un Docente.
    *
    * @apiParam {String} nombres  del(a) Docente
    * @apiParam {String} documento_identidad del(a) Docente
    * @apiParam {String} primer_apellido del(a) Docente (OPCIONAL)
    * @apiParam {String} segundo_apellido del(a) Docente (OPCIONAL)
    *
    * @apiParamExample {json} Request-Example:
    {
    	"nombres": "gladys",
    	"documento_identidad": "123456",
    	"primer_apellido": "bravo"
    }
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    {
      "finalizado": true,
      "mensaje": "Creación de docente exitoso.",
      "datos": {
          "estado": "ACTIVO",
          "id_docente": 1,
          "nombres": "gladys",
          "documento_identidad": "123456",
          "primer_apellido": "bravo",
          "_usuario_creacion": 1,
          "_fecha_modificacion": "2018-03-03T15:41:55.676Z",
          "_fecha_creacion": "2018-03-03T15:41:55.676Z",
          "segundo_apellido": null,
          "_usuario_modificacion": null
      }
  }
  *
  *
  */
  app.apiPublic.post('/docentes', app.controller.docente.registrarDocente);

  /**
    * @api {post} /public/docentes?order=&limit=&page=  Listar Docente
    * @apiName Listar Docente
    * @apiGroup Docente
    * @apiDescription Para listar un Docente
    * Listar un Docente.
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
      "mensaje": "Obtención exitosa de docentes.",
      "datos": {
          "count": 1,
          "rows": [
              {
                  "id_docente": 1,
                  "documento_identidad": "123456",
                  "nombres": "gladys",
                  "primer_apellido": "bravo",
                  "segundo_apellido": null,
                  "estado": "ACTIVO",
                  "_usuario_creacion": 1,
                  "_usuario_modificacion": null,
                  "_fecha_creacion": "2018-03-03T15:41:55.676Z",
                  "_fecha_modificacion": "2018-03-03T15:41:55.676Z"
              }
              ...
          ]
      }
  }
  *
  *
  */
  app.apiPublic.get('/docentes', app.controller.docente.listarDocente);

  /**
   * @api {get} /public/docentes/:id_docente Obtener Docente
   * @apiName Obtener Docente
   * @apiGroup Docente
   * @apiDescription Para obtener un Docente
   *
   * @apiParam {Number} id_docente Identificador del Docente
   *
   * @apiSuccess {Number} id_docente Id de docente
   * @apiSuccess {String} nombres Nombre del Docente
   * @apiSuccess {String} primer_apellido Primer Apellido del docente
   * @apiSuccess {String} segundo_apellido Segundo Apellido del docente
   * @apiSuccess {String} estado Estado del registro del docente
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   {
      "finalizado": true,
      "mensaje": "Obtención exitosa del docente.",
      "datos": {
          "id_docente": 1,
          "documento_identidad": "123456",
          "nombres": "gladys",
          "primer_apellido": "bravo",
          "segundo_apellido": null,
          "estado": "ACTIVO",
          "_usuario_creacion": 1,
          "_usuario_modificacion": null,
          "_fecha_creacion": "2018-03-03T15:41:55.676Z",
          "_fecha_modificacion": "2018-03-03T15:41:55.676Z"
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
  app.apiPublic.get('/docentes/:id_docente', app.controller.docente.listarDocenteId);

};
