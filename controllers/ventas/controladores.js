import { getBD } from '../../db/db.js';
import { ObjectId } from 'mongodb';


const getAVentas = async (callback) => {
    const baseDeDatos = getBD();
    await baseDeDatos.collection('ventas').find({}).limit(50).toArray(callback);
}

const postAVentas = async (datosVenta, callback) => {
    const baseDeDatos = getBD();
    try {     
        await baseDeDatos.collection('ventas').insertOne(datosVenta, callback)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
    console.log("Venta a crear: ", req.body);
}

const patchAVentas = async (id, edicion, callback) => {
    const filtroVenta = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getBD();
    await baseDeDatos.collection('ventas').findOneAndUpdate(filtroVenta, operacion,{upsert: true, returnOriginal: true}, callback);
}

const deleteAVentas = async (id, callback) => {
    const filtroVentas = {_id: new ObjectId(id)}
    const baseDeDatos = getBD();
    await baseDeDatos.collection('ventas').deleteOne(filtroVentas, callback);
}

export { getAVentas, postAVentas, patchAVentas, deleteAVentas }