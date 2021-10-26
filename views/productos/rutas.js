import Express, { Router } from 'express';
import { deleteAProductos, getAProductos, postAProductos, patchAProductos } from '../../controllers/productos/controladores.js';

const rutasProductos = Express.Router();

const callBackGenerico = (res) => (err, result) => {
    if (err) {
        console.error(err);
        res.sendStatus(500);
    }else{
        res.json(result);
    }
}

rutasProductos.route('/productos').get ((req, res)=>{
    console.log("Alguien hizo get en la ruta /productos");
    getAProductos(callBackGenerico(res));
});

rutasProductos.route('/productos').post ((req, res) => {
    postAProductos(req.body, callBackGenerico(res));
});

rutasProductos.route('/productos/:id').patch ((req, res) => {
    patchAProductos(req.params.id, req.body,callBackGenerico(res));
});

rutasProductos.route('/productos/:id').delete ((req, res) => {
    deleteAProductos(req.params.id, callBackGenerico(res));
});

export default rutasProductos;