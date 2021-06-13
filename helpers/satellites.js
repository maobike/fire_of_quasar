const { saveDb } = require("./saveFile");

/**
 * Satélites con sus valores en X, Y, para modificar favor dirigirse a .env en la raíz
 */
const kenobi    = [parseFloat(process.env.kenobiX), parseFloat(process.env.kenobiY)];
const skywalker = [parseFloat(process.env.skywalkerX), parseFloat(process.env.skywalkerY)];
const sato      = [parseFloat(process.env.satoX), parseFloat(process.env.satoY)];


/**
 * Obtiene la ubicación de un objeto por medio de trilateración de posición
 * @param {*} distances array de las distancias de todos los satélites
 * @returns position, posición en X, Y
 */
const GetLocation = (distances = '') => {

    const beacons  = setParametersSatellites( distances );
    const position = trilateration(beacons);
    
    return position;
}

/**
 * Extrae las distancias y los unifica en un arreglo
 * @param {*} satellites arreglo completo con cada satélite y la distancia decada uno
 * @returns arrDistances, el arreglo de las distancias de cada satélite
 */
const extractLocations = (satellites = '') => {

    let arrDistances = [];
    satellites.forEach(element => {
        arrDistances.push(element.distance);
    });

    return arrDistances;
}

/**
 * Función que obtiene la trilateración con los 3 satélites.
 * @param {*} beacons parámetros de los 3 satélites, coordenadas X,Y y distancia.
 * @returns coordenadas X,Y
 */
const trilateration = (beacons) => {
    var j, k, x, y;

    if (beacons.length < 3) {
        console.error("Error! Por favor agregue al menos tres satélites!");
        return { x:0, y:0 };
    }
    
    k = (sqr(beacons[0].x) + sqr(beacons[0].y) - sqr(beacons[1].x) - sqr(beacons[1].y) - sqr(beacons[0].distance) + sqr(beacons[1].distance)) / (2 * (beacons[0].y - beacons[1].y)) - (sqr(beacons[0].x) + sqr(beacons[0].y) - sqr(beacons[2].x) - sqr(beacons[2].y) - sqr(beacons[0].distance) + sqr(beacons[2].distance)) / (2 * (beacons[0].y - beacons[2].y));
    j = (beacons[2].x - beacons[0].x) / (beacons[0].y - beacons[2].y) - (beacons[1].x - beacons[0].x) / (beacons[0].y - beacons[1].y);
    x = k / j;
    y = ((beacons[1].x - beacons[0].x) / (beacons[0].y - beacons[1].y)) * x + (sqr(beacons[0].x) + sqr(beacons[0].y) - sqr(beacons[1].x) - sqr(beacons[1].y) - sqr(beacons[0].distance) + sqr(beacons[1].distance)) / (2 * (beacons[0].y - beacons[1].y));
		
    return {x, y};
}

const sqr = (a) => {
	return Math.pow(a, 2);
};

/**
 * Obtiene u organiza los parámetros de los satélites
 * @param {*} distances arreglo de las distancias.
 * @returns objeto con los 3 satélites con sus coordenadas X,Y y distancia.
 */
const setParametersSatellites = ( distances ) => {
    const beacons = [
        {x: kenobi[0],    y: kenobi[1],    distance: distances[0]},
        {x: skywalker[0], y: skywalker[1], distance: distances[1]},
        {x: sato[0],      y: sato[1],      distance: distances[2]}
    ];

    return beacons;
}

const saveSatellite = ( name, data) => {
    const satellite = {
        name : name,
        distance : data.distance,
        message : data.message
    }

    saveDb( satellite );

    return satellite;
}

module.exports = {
    GetLocation,
    extractLocations,
    saveSatellite,
}