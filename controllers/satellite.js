const { response, request } = require('express');
const { extractMessage, getMessage } = require('../helpers/messages');
const { GetLocation, extractLocations, saveSatellite } = require('../helpers/satellites');


const verifySatellite = (req = request, res = response) => {

    const { satellites } = req.body;
    
    if (  satellites?.length < 3 ) {
        res.status(404).json({
            msg : `no se pueda determinar la posición o el mensaje`
        })
    }

    const ArrMessages = extractMessage( satellites );
    const message     = getMessage( ArrMessages );
    
    const ArrDistances = extractLocations( satellites );
    const position     = GetLocation( ArrDistances );

    res.json({
        position,
        message
    })
}

const setSatellite = (req = request, res = response) => {

    const name = req.params.name;
    const data = req.body

    const satellite = saveSatellite( name, data );
    
    
    res.json({
        satellite
    })
}

const getPositionObject = ( req = request, res = response ) => {

    res.json({
        msg: 'ok'
    })
}


module.exports = {
    verifySatellite,
    setSatellite,
    getPositionObject,  
}