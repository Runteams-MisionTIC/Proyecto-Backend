import { MongoClient } from 'mongodb';
import Dotenv from 'dotenv';

Dotenv.config({path: './.env'});

const stringConection = process.env.DATABASE_URL;

const cliente = new MongoClient(stringConection,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

let baseDeDatos;
const getBD = () => {
    return baseDeDatos;
}

const ConectarBaseDatos = (callback) => {
    cliente.connect((err, db)=>{
        if (err) {
            console.error("Error conectando a la base de datos");
        }
        baseDeDatos = db.db('dbRunteams');//Nombre de la base de datos dentro de mongo
        console.log("Conexión exitosa"); 
        return callback();
    });
}

export { ConectarBaseDatos, getBD };
