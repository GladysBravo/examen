module.exports = (app) => {

  /**
    * @api {post} /public/reservar/crear Registrar Reserva
    * @apiName Registrar Reserva
    * @apiGroup Reserva
    * @apiDescription Para registrar un Reserva
    * Registrar un Reserva.
    *
    * @apiParam {Date} fecha de la Reserva
    * @apiParam {String} hora de inicio de la Reserva
    * @apiParam {String} hora de fin de la Reserva
    * @apiParam {Integer} fid_Reservar
    * @apiParam {Integer} fid_usuario
    *
    * @apiParamExample {json} Request-Example:
    {
      "fecha_reserva": "12/12/2013",
  	  "hora_inicio": "11:00",
      "hora_fin": "13:00",
      "fid_Reservar": 1,
      "fid_usuario": 2
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
    "mensaje": "La existe la Reserva de la Reservar.",
    "datos": {}
  }
  */
  app.apiPublic.post('/reservar/crear', app.controller.reserva.crearReserva);

  /**
  * @api {put} /public/reservar/modificar/:id_reserva?estado=CANCELADO Cancelar Reserva
  * @apiName Cancelar Reserva
  * @apiGroup Reserva
  * @apiDescription Para Cancelar una Reserva
  * Cancelar una Reserva.
  *
  * @apiParam {Number} id_reserva Identificador de la reserva
  * @apiParam {String} estado Estado CANCELADO de la reserva
  *
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  {
      "finalizado": true,
      "mensaje": "Reserva cancelado exitosamente.",
      "datos": {}
  }
  *
  */
  app.apiPublic.put('/reservar/modificar/:id_reserva', app.controller.reserva.cancelarReserva);


  /**
   * @api {get} /public/reservar/listar?order=&limit=&page= Lista
   * @apiName Listar Reservas
   * @apiGroup Reserva
   * @apiDescription Para devolver la lista de reservar
   *
   * @apiParam (Query) {Texto} order (Opcional) Campo por el cual se ordenará el resultado
   * @apiParam (Query) {Numerico} limit (Opcional) Cantidad de resultados a obtener
   * @apiParam (Query) {Numerico} page (Opcional) Número de página de resultados
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   {
       "finalizado": true,
       "mensaje": "Obtención exitosa de salas.",
       "datos": {
           "count": 3,
           "rows": [
               {
                   "id_reserva": 3,
                   "fecha_reserva": "2013-12-12T04:00:00.000Z",
                   "hora_inicio": "11:00",
                   "hora_fin": "13:00",
                   "estado": "ACTIVO",
                   "fid_usuario": 2,
                   "fid_sala": 1,
                   "usuario": {
                       "id_usuario": 2,
                       "email": "gbravo@hotmail.com",
                       "usuario": "gbravo",
                       "estado": "ACTIVO"
                   },
                   "sala": {
                       "id_sala": 1,
                       "nombre": "SALA 1",
                       "cod_sala": "S-1",
                       "estado": "ACTIVO"
                   }
               },
               {
                   "id_reserva": 2,
                   "fecha_reserva": "2017-12-12T04:00:00.000Z",
                   "hora_inicio": "11:00",
                   "hora_fin": "13:00",
                   "estado": "ACTIVO",
                   "fid_usuario": 2,
                   "fid_sala": 1,
                   "usuario": {
                       "id_usuario": 2,
                       "email": "gbravo@hotmail.com",
                       "usuario": "gbravo",
                       "estado": "ACTIVO"
                   },
                   "sala": {
                       "id_sala": 1,
                       "nombre": "SALA 1",
                       "cod_sala": "S-1",
                       "estado": "ACTIVO"
                   }
               }
               ...
           ]
       }
   }
   */
  app.apiPublic.get('/reservar/listar', app.controller.reserva.listarReservas);

};
