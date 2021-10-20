import { getBD } from '../../db/db.js';
import { ObjectId } from 'mongodb';


const getAProductos = async (callback) => {
    const baseDeDatos = getBD();
    await baseDeDatos.collection('productos').find({}).limit(50).toArray(callback);
}

const postAProductos = async (datosProducto, callback) => {
    const baseDeDatos = getBD();
    try {     
        await baseDeDatos.collection('productos').insertOne(datosProducto, callback)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
    console.log("Producto a crear: ", req.body);
}

const patchAProductos = async (id, edicion, callback) => {
    const filtroProducto = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getBD();
    await baseDeDatos.collection('productos').findOneAndUpdate(filtroProducto, operacion,{upsert: true, returnOriginal: true}, callback);
}

const deleteAProductos = async (id, callback) => {
    const filtroProducto = {_id: new ObjectId(id)}
    const baseDeDatos = getBD();
    await baseDeDatos.collection('productos').deleteOne(filtroProducto, callback);
}

export { getAProductos, postAProductos, patchAProductos, deleteAProductos }