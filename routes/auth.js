
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').notEmpty(),
    check('correo', 'El formato del correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login );

module.exports = router;





