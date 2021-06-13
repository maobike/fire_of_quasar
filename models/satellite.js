
const { Schema, model} = require('mongoose');

const SatelliteSchema = Schema({
    position: {
        type : String,
        required: [true, 'La posición es obligatoria']
    },
    message: {
        type : Date,
        required: [true, 'El mensaje es obligatorio']
    },
})

// Esto saca los primeros parámetros del retorno JSON en la respuesta del endpoint.
SatelliteSchema.methods.toJSON = function() {
    const { __v, password, _id, ...satellite  } = this.toObject();
    satellite.uid = _id;
    return satellite;
}

module.exports = model( 'Satellite', SatelliteSchema );