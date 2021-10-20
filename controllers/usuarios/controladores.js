import { getBD } from '../../db/db.js';
import { ObjectId } from 'mongodb';


const getAUsuarios = async (callback) => {
    const baseDeDatos = getBD();
    await baseDeDatos.collection('usuarios').find({}).limit(50).toArray(callback);
}

const postAUsuarios = async (datosUsuario, callback) => {
    const baseDeDatos = getBD();
    try {     
        await baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
    console.log("Usuario a crear: ", req.body);
}

const patchAUsuarios = async (id, edicion, callback) => {
    const filtroUsuarios = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getBD();
    await baseDeDatos.collection('usuarios').findOneAndUpdate(filtroUsuarios, operacion,{upsert: true, returnOriginal: true}, callback);
}

const deleteAUsuarios = async (id, callback) => {
    const filtroUsuarios = {_id: new ObjectId(id)}
    const baseDeDatos = getBD();
    await baseDeDatos.collection('usuarios').deleteOne(filtroUsuarios, callback);
}

export { getAUsuarios, postAUsuarios, patchAUsuarios, deleteAUsuarios }