module.exports = (app) => {

  /**
    * @api {post} /public/materias  Registrar Materia
    * @apiName Registrar Materia
    * @apiGroup Materia
    * @apiDescription Para registrar un Materia
    * Registrar un Materia.
    *
    * @apiParam {String} nombres  de la Materia
    * @apiParam {String} sigla de la Materia
    * @apiParam {Number} fid_docente Id del Docente
    *
    * @apiParamExample {json} Request-Example:
    {
    	"nombre": "mat 12",
    	"fid_docente": 1,
    	"sigla": "mat 12"
    }
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    {
      "finalizado": true,
      "mensaje": "Creación de materia exitoso.",
      "datos": {
          "estado": "ACTIVO",
          "id_materia": 2,
          "nombre": "mat 12",
          "fid_docente": 1,
          "sigla": "mat 12",
          "_usuario_creacion": 1,
          "_fecha_modificacion": "2018-03-03T16:32:48.606Z",
          "_fecha_creacion": "2018-03-03T16:32:48.606Z",
          "_usuario_modificacion": null
      }
  }
  *
  *
  */
  app.apiPublic.post('/materias', app.controller.materia.registrarMateria);


  /**
    * @api {post} /public/materias?order=&limit=&page=  Listar Materia
    * @apiName Listar Materia
    * @apiGroup Materia
    * @apiDescription Para listar un Materia
    * Listar un Materia.
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
      "mensaje": "Obtención exitosa de materias.",
      "datos": {
          "count": 1,
          "rows": [
              {
                  "id_materia": 2,
                  "nombre": "mat 12",
                  "sigla": "mat 12",
                  "estado": "ACTIVO",
                  "_usuario_creacion": 1,
                  "_usuario_modificacion": null,
                  "_fecha_creacion": "2018-03-03T16:32:48.606Z",
                  "_fecha_modificacion": "2018-03-03T16:32:48.606Z",
                  "fid_docente": 1
              }
          ]
      }
  }
  *
  *
  */
  app.apiPublic.get('/materias', app.controller.materia.listarMateria);

  /**
   * @api {get} /public/Materias/listar/:id_Materia Obtener Materia
   * @apiName Obtener Materia
   * @apiGroup Materia
   * @apiDescription Para obtener un Materia
   *
   * @apiParam {Number} id_Materia Identificador del Materia
   *
   * @apiSuccess {Number} id_materia Id de Materia
   * @apiSuccess {String} nombre Nombre de la Materia
   * @apiSuccess {String} sigla Sigla de la Materia
   * @apiSuccess {Number} fid_docente Id del Docente
   * @apiSuccess {String} estado Estado del registro del Materia
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   {
      "finalizado": true,
      "mensaje": "Obtención exitosa del materia.",
      "datos": {
          "id_materia": 2,
          "nombre": "mat 12",
          "sigla": "mat 12",
          "estado": "ACTIVO",
          "_usuario_creacion": 1,
          "_usuario_modificacion": null,
          "_fecha_creacion": "2018-03-03T16:32:48.606Z",
          "_fecha_modificacion": "2018-03-03T16:32:48.606Z",
          "fid_docente": 1
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
  app.apiPublic.get('/materias/:id_materia', app.controller.materia.listarMateriaId);

};
