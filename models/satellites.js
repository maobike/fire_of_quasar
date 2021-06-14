const Satellite = require('./satellite');
require('./satellite');

class Satellites {
    _Listado = {};

    get listArr() {
        const listado = [];
        Object.keys(this._Listado).forEach( key => {
            const satellite = this._Listado[key];
            listado.push( satellite );
        });
        return listado;
    }

    constructor() {
        this._Listado = {};
    }

    addSatellite( data = '' ) {
        const satellite = new Satellite( data );
        this._Listado[satellite.name] = satellite;
    }

    deleteSatellite( name = '' ) {
        if ( this._Listado[name] ) {
            delete this._Listado[name];
        }
    }

    deleteAllSatellite( satellites = [] ) {
        satellites.forEach( satellite => {
            if ( this._Listado[satellite.name] ) {
                delete this._Listado[satellite.name];
            }
        });
    }

    loadSatellitesFromArr( satellites = []) {
        satellites.forEach( satellite => {
            this._Listado[satellite.name] = satellite;
        });
    }

}

module.exports = Satellites;