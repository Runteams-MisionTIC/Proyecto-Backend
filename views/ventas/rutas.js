import Express, { Router } from 'express';
import { deleteAVentas, getAVentas, postAVentas, patchAVentas } from '../../controllers/ventas/controladores.js';

const rutasVentas = Express.Router();

const callBackGenerico = (res) => (err, result) => {
    if (err) {
        console.error(err);
        res.sendStatus(500);
    }else{
        res.json(result);
    }
}

rutasVentas.route('/ventas').get ((req, res)=>{
    console.log("Alguien hizo get en la ruta /ventas");
    getAVentas(callBackGenerico(res));
});

rutasVentas.route('/ventas').post ((req, res) => {
    postAVentas(req.body, callBackGenerico(res));
});

rutasVentas.route('/ventas/:id').patch ((req, res) => {
    patchAVentas(req.params.id, req.body,callBackGenerico(res));
});

rutasVentas.route('/ventas/:id').delete ((req, res) => {
    deleteAVentas(req.params.id, callBackGenerico(res));
});

export default rutasVentas;