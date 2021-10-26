import Express, { Router } from 'express';
import { deleteAUsuarios, getAUsuarios, postAUsuarios, patchAUsuarios } from '../../controllers/usuarios/controladores.js';

const rutasUsuarios = Express.Router();

const callBackGenerico = (res) => (err, result) => {
    if (err) {
        console.error(err);
        res.sendStatus(500);
    }else{
        res.json(result);
    }
}

rutasUsuarios.route('/usuarios').get ((req, res)=>{
    console.log("Alguien hizo get en la ruta /usuarios");
    getAUsuarios(callBackGenerico(res));
});

rutasUsuarios.route('/usuarios').post ((req, res) => {
    postAUsuarios(req.body, callBackGenerico(res));
});

rutasUsuarios.route('/usuarios/:id').patch ((req, res) => {
    patchAUsuarios(req.params.id, req.body,callBackGenerico(res));
});

rutasUsuarios.route('/usuarios/:id').delete ((req, res) => {
    deleteAUsuarios(req.params.id, callBackGenerico(res));
});

export default rutasUsuarios;