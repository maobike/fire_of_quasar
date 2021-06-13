/**
 * api/satellites
 */

 const { Router, request } = require('express');
 const { check } = require('express-validator');
 
 const { verifySatellite, } = require('../controllers/satellite');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const router = Router();
 
 router.post('/topsecret',[
    check('satellites', 'Los satélites son obligatorios').notEmpty(),
    check('satellites.*.distance', 'La distancia es obligatoria').notEmpty(),
    check('satellites.*.distance', 'La distancia debe ser numérica').isNumeric(),
    check('satellites.*.message', 'El mensaje es obligatorio').isArray(),
    validarCampos
 ], verifySatellite );
 
 
 module.exports = router;