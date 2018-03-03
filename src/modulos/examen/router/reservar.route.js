module.exports = (app) => {

  /**
    * @api {post} /public/reservar Registrar Reserva
    * @apiName Registrar Reserva Horario
    * @apiGroup Reserva Horario
    * @apiDescription Para registrar un Reserva Horario
    * Registrar un Reserva Horario.
    *
    * @apiParam {Date} fecha de la Reserva Horario
    * @apiParam {String} hora de inicio de la Reserva Horario
    * @apiParam {String} hora de fin de la Reserva Horario
    * @apiParam {Integer} fid_aula
    * @apiParam {Integer} fid_Reserva de Horario
    *
    * @apiParamExample {json} Request-Example:
    {
    	"fecha_reserva": "12/12/2013",
    	"hora_inicio": "12:00",
        "hora_fin": "12:20",
        "fid_aula": 1,
        "fid_Reserva de Horario": 1
    }
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    {
      "finalizado": true,
      "mensaje": "Creación de reserva exitoso.",
      "datos": {}
    }
  *
  *
  * @apiError No Content
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 412 No Content
  {
      "finalizado": false,
      "mensaje": "La existe la reserva en ese horario de la aula.",
      "datos": {}
  }
  */

  app.apiPublic.post('/reservar', app.controller.reservar.registrarReservaHorario);

  /**
    * @api {post} /public/reservar?order=&limit=&page=  Listar Reserva de Horario
    * @apiName Listar Reserva de Horario
    * @apiGroup Reserva de Horario
    * @apiDescription Para listar un Reserva de Horario
    * Listar un Reserva de Horario.
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
      "mensaje": "Obtención exitosa.",
      "datos": {
          "count": 1,
          "rows": [
              {
                  "id_reserva_horario": 1,
                  "fecha_reserva": "2013-12-12T04:00:00.000Z",
                  "hora_inicio": "12:00",
                  "hora_fin": "12:20",
                  "estado": "ACTIVO",
                  "_usuario_creacion": 1,
                  "_usuario_modificacion": null,
                  "_fecha_creacion": "2018-03-03T21:00:14.716Z",
                  "_fecha_modificacion": "2018-03-03T21:00:14.716Z",
                  "fid_aula": 1,
                  "fid_materia": 1,
                  "aula": {
                      "id_aula": 1,
                      "nombre": "aula A",
                      "estado": "ACTIVO",
                      "_usuario_creacion": 1,
                      "_usuario_modificacion": null,
                      "_fecha_creacion": "2018-03-03T20:58:46.399Z",
                      "_fecha_modificacion": "2018-03-03T20:58:46.399Z"
                  },
                  "materia": {
                      "id_materia": 1,
                      "nombre": "Calcul",
                      "sigla": "cal",
                      "estado": "ACTIVO",
                      "_usuario_creacion": 1,
                      "_usuario_modificacion": null,
                      "_fecha_creacion": "2018-03-03T20:59:05.048Z",
                      "_fecha_modificacion": "2018-03-03T20:59:05.048Z",
                      "docente": {
                         "id_docente": 1,
                         "documento_identidad": "123456",
                         "nombres": "gladsy",
                         "primer_apellido": "bravo",
                         "segundo_apellido": "",
                         "estado": "ACTIVO",
                         "_usuario_creacion": 1,
                         "_usuario_modificacion": null,
                         "_fecha_creacion": "2018-03-03T20:58:40.603Z",
                         "_fecha_modificacion": "2018-03-03T20:58:40.603Z"
                     }
                  }
              }
          ]
      }
  }
  *
  *
  */
  app.apiPublic.get('/reservar', app.controller.reservar.listarReservarHorario);

};
