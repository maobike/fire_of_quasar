
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    identificacion: {
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    fecha_nacimiento: {
        type : Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    nombre: {
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type : String,
        required: [true, 'El apellido es obligatorio']
    },
    correo: {
        type : String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    estado: {
        type : Boolean,
        default: true,
    },
})

// Esto saca los primeros parámetros del retorno JSON en la respuesta del endpoint.
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );