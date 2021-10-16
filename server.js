//Asi se importan librerias en node
//const express = require('express');

import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors'; 

const stringConection = //Poner aquí el string obtenido en Mongo

const cliente = new MongoClient(stringConection,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

const app = Express();

app.use(Express.json());
app.use(Cors())

app.get('/ventas', (req, res)=>{
    console.log("Alguien hizo get en la ruta /ventas");
    baseDeDatos.collection('ventas').find({}).limit(50).toArray((err, result)=>{
        if (err) {
            console.error(err)
            res.sendStatus(500)
        }else{
            res.json(result)
        }
    })
});

app.post('/ventas/nueva',(req, res) => {
    const datosVenta = req.body
    //console.log("LLaves: ", Object.keys(datosVenta))
    try {
        //Nombre de la colección dentro de la base de datos, nombrada en la función main        
        baseDeDatos.collection('ventas').insertOne(datosVenta,(err, result)=>{
            if (err) {
                console.error(err)
                res.sendStatus(500)
            }else{
                console.log(result)
                res.sendStatus(200)
            }
        });

        res.sendStatus(200)
        res.send("Venta creada");
    } catch (error) {
        res.sendStatus(500)
    }
    console.log("Venta a crear: ", req.body);
});

app.patch('/ventas/editar', (req, res) => {
    const edicion = req.body;
    const filtroBD = {_id: new ObjectId(edicion.id)} 
    delete edicion.id;
    const operacion = {
        $set: edicion,
    }

    baseDeDatos.collection('ventas').findOneAndUpdate(filtroBD,operacion,{upsert:true, returnOriginal:true}, (err, result) => {
        if (err) {
            console.error(err)
            res.sendStatus(500)
        }else{
            console.log(result)
            res.sendStatus(200)
        }
    });

})
app.delete('/ventas/eliminar', (req, res) => {
    const filtroBD = {_id: new ObjectId(req.body.id)}
    baseDeDatos.collection('ventas').deleteOne(filtroBD,(err, result) => {
        if (err) {
            console.error(err)
            res.sendStatus(500)
        }else{
            console.log(result)
            res.sendStatus(200)
        }
    });
})

//Al parecer esta función sirve para conectar a la base de datos
let baseDeDatos;
const main = () => {

    cliente.connect((err, db)=>{
        if (err) {
            console.error("Error conectando a la base de datos")
        }
        baseDeDatos = db.db('dbRunteams')//Nombre de la base de datos dentro de mongo
        console.log("Conexión exitosa")
        return app.listen(2999, ()=>{
                console.log("Escuchando server 2999");
            }
        )
    })
}
//Creo que esto es para mantener el servidor corriendo
main();