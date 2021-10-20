//Asi se importan librerias en node
//const express = require('express');

import Express from 'express';
import Cors from 'cors';
import Dotenv from 'dotenv';
import { ConectarBaseDatos } from './db/db.js'
import rutasVentas from './views/ventas/rutas.js';

Dotenv.config({path: './.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVentas);

const main = () => {
    return app.listen(process.env.PORT, ()=>{
        console.log(`Escuchando puerto ${process.env.PORT}`);
    });
}

ConectarBaseDatos(main);