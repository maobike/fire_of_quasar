const assert =  require("chai").assert;
const messages = require("../helpers/messages");

describe("Funciónes de los mensajes", () => {
    const satellitesObj = [
        { "message": ["este", "", "", "mensaje", ""] },
        { "message": ["", "es", "", "", "secreto"] },
        { "message": ["este", "", "un", "", ""] }
    ]
    
    describe('extrae los mensajes de los satélites y los inserta en un array', () => {

        it('Debe retornar un array con los mensajes', function() {

            const messagesMock = [
                    ["este", "", "", "mensaje", ""],
                    ["", "es", "", "", "secreto"],
                    ["este", "", "un", "", ""]
            ]
            
            messagesResp = messages.extractMessage( satellitesObj );
            assert.deepEqual( messagesMock, messagesResp, 'El array resultante no es el esperado');

        });
    });

    describe('Obtiene el mensaje enviado de los satélites', () => {
        it('Debe retornar un mensaje en un string', () => {
            const messagesMock = "este es un mensaje secreto";
            const messagesArr  = messages.extractMessage( satellitesObj );
            const messagesResp = messages.getMessage( messagesArr );
            assert.equal( messagesMock, messagesResp, '');
        });
    });
})