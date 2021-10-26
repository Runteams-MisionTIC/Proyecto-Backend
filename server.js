//Asi se importan librerias en node
//const express = require('express');

import Express from 'express';
import Cors from 'cors';
import Dotenv from 'dotenv';
import { ConectarBaseDatos } from './db/db.js'
import rutasVentas from './views/ventas/rutas.js';
import rutasProductos from './views/productos/rutas.js';
import rutasUsuarios from './views/usuarios/rutas.js';
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'


Dotenv.config({path: './.env'});

const port = process.env.PORT || 2999

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://misiontic-runteams.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-runteams-misiontic',
    issuer: 'https://misiontic-runteams.us.auth0.com/',
    algorithms: ['RS256']
});


app.use(jwtCheck);
app.use(rutasVentas);
app.use(rutasProductos);
app.use(rutasUsuarios);

const main = () => {
    return app.listen(port, ()=>{
        console.log(`Escuchando puerto ${port}`);
    });
}

ConectarBaseDatos(main);