const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            satellite:  '',
        }

        // Conectar a base de datos
        // Comentamos para no usar base de datos
        //this.conectarDb();

        // MiddleWares
        this.middleWares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDb(){
        await dbConnection();
    }

    middleWares() {

        // CORS
        this.app.use( cors() );

        // Directorio público
        this.app.use( express.static('public') );

        // Lectura y parseo del Body
        this.app.use( express.json() );

    }

    routes() {

        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.satellite, require('../routes/satellites'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Corriendo en el puerto ${ this.port }`);
        });        
    }

}

module.exports = Server;
