const assert =  require("chai").assert;
const satellites = require("../helpers/satellites");

describe("Funciónes de los satélites", () => {
    const satellitesObj = [
        {
            "name": "kenobi",
            "distance": 100.0,
            "message": ["este", "", "", "mensaje", ""]
        },
        {
            "name": "skywalker",
            "distance": 115.5,
            "message": ["", "es", "", "", "secreto"]
        },
        {
            "name": "sato",
            "distance": 142.7,
            "message": ["este", "", "un", "", ""]
        }
    ]
    
        describe('extrae las distancias y las inserta en un array', () => {

        it('Debe retornar un array con las distancias', function() {

            const distancesMock = [ 100.0, 115.5, 142.7 ];
            
            distancesResp = satellites.extractLocations( satellitesObj );
            assert.deepEqual( distancesMock, distancesResp, 'El array resultante no es el esperado');

        });
    });

    describe('Obtiene la posición x, y que se ha enviado de los satélites', () => {
        it('Debe retornar un objeto {x, y} con la posición', () => {
            const positionMock = {
                "x": -487.28591250000005,
                "y": 1557.0142250000004
            };

            const distancesArr = satellites.extractLocations( satellitesObj );
            
            const beacons = [
                {x: -500, y: -200, distance: distancesArr[0]},
                {x: 100,  y: -100, distance: distancesArr[1]},
                {x: 500,  y: 100,  distance: distancesArr[2]}
            ];
            
            const positionResp = satellites.trilateration( beacons );
            assert.deepEqual( positionMock, positionResp, `Las posiciones no son las esperadas`);
        });
    });
})