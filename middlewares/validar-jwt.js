const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const usuario = await Usuario.findById(uid);

        // Verificar que el usuario exista en la DB
        if ( !usuario ) {
            res.status(401).json({
                msg: 'Token no valido - Usuario no existe en DB'
            })
        }

        // Verificar si el estado es true
        if ( !usuario.estado ) {
            res.status(401).json({
                msg: 'Token no valido - Usuario estado false'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}

