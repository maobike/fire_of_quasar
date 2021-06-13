const { Usuario } = require('../models');

const emailExiste = async( correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (  existeEmail ) {
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
    
}

const usuarioIdExiste = async( id ) => {
    // Verificar si el id existe
    const existeId = await Usuario.findById(id);
    if (  !existeId ) {
        throw new Error(`El id ${ id } del usuario no existe`);
    }
    
}

module.exports = {
    emailExiste,
    usuarioIdExiste,
}