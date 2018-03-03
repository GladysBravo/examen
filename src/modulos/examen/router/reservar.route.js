module.exports = (app) => {

  // /**
  //   * @api {post} /public/reservar/crear Registrar Reserva
  //   * @apiName Registrar Reserva
  //   * @apiGroup Reserva
  //   * @apiDescription Para registrar un Reserva
  //   * Registrar un Reserva.
  //   *
  //   * @apiParam {Date} fecha de la Reserva
  //   * @apiParam {String} hora de inicio de la Reserva
  //   * @apiParam {String} hora de fin de la Reserva
  //   * @apiParam {Integer} fid_Reservar
  //   * @apiParam {Integer} fid_usuario
  //   *
  //   * @apiParamExample {json} Request-Example:
  //   {
  //     "fecha_reserva": "12/12/2013",
  // 	  "hora_inicio": "11:00",
  //     "hora_fin": "13:00",
  //     "fid_Reservar": 1,
  //     "fid_usuario": 2
  //   }
  //   *
  //   * @apiSuccessExample Success-Response:
  //   *     HTTP/1.1 200 OK
  //   {
  //     "finalizado": true,
  //     "mensaje": "Creación de reserva exitoso.",
  //     "datos": {}
  //   }
  // *
  // *
  // * @apiError No Content
  // *
  // * @apiErrorExample Error-Response:
  // *     HTTP/1.1 412 No Content
  // {
  //   "finalizado": false,
  //   "mensaje": "La existe la Reserva de la Reservar.",
  //   "datos": {}
  // }
  // */

  app.apiPublic.post('/reservar', app.controller.reservar.registrarReservaHorario);

};
