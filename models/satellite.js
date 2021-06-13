class Satellite {
    name     = '';
    distance = '';
    message  = '';

    constructor( data ) {
        this.name     = data.name;
        this.distance = data.distance;
        this.message  = data.message;
    }
}

module.exports = Satellite;


