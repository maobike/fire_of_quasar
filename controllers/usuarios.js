const { response, request } = require('express');

const Usuario = require('../models/usuario');

const verificarPersona = async(req = request, res = response) => {

    const { identificacion } = req.params;

    const usuario = await Usuario.findOne( {identificacion: identificacion} );

    res.json({
        usuario
    })
}

const verificarAntecedentesPersona = async(req = request, res = response) => {

    const { identificacion } = req.params;

    const usuario = await Usuario.findOne( {identificacion: identificacion} );

    res.json({
        usuario
    })
}

const obtenerPuntaje = async(req = request, res = response) => {

    const score = Math.floor(Math.random() * 100) +1;

    res.json({
        score
    })
}

module.exports = {
    verificarPersona,
    verificarAntecedentesPersona,
    obtenerPuntaje,
}