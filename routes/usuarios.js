/**
 * api/usuarios
 */

const { Router, request } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT} = require('../middlewares');

const { emailExiste, usuarioIdExiste } = require('../helpers/db-validators');

const { 
    verificarPersona,
    verificarAntecedentesPersona,
    obtenerPuntaje,
} = require('../controllers/usuarios');

const router = Router();

router.get('/:identificacion', verificarPersona );

router.get('/status/:identificacion', verificarAntecedentesPersona );

router.get('/puntaje/obtener', obtenerPuntaje );

module.exports = router;