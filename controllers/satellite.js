const { response, request } = require('express');
const { extractMessage, getMessage } = require('../helpers/messages');
const { GetLocation, extractLocations } = require('../helpers/satellites');


const verifySatellite = async(req = request, res = response) => {

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

module.exports = {
    verifySatellite
}