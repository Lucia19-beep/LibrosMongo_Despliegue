import express from "express";
import mongoose from "mongoose";
import Autor from "../model/autor.js";

const router = express.Router();


router.get('/', (req, res) => {
    Autor.find().then(resultado => {
        if(resultado)
            res.status(200)
                .send( {ok: true, 
                        resultado: resultado});
        else
            res.status(500)
                .send( {ok: false, 
                        error: "No se han encontrado autores"});

    }).catch (error => {
        res.status(500)
           .send( {ok: false, 
                   error: "No se han encontrado autores"});
    });
});
router.get('/:id', (req, res) => {
   Autor.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .send({ok: true, 
                      resultado: resultado});
        else
            res.status(404)
               .send({ok: false, 
                      error: `Autor ${req.params.id} no encontrado`});
    }).catch (error => {
        res.status(404)
           .send({ok: false, 
                  error: `Autor ${req.params.id} no encontrado`});
    }); 
});

router.post('/', (req, res) => {
    let nuevoAutor = new Autor({
        nombre:req.body.nombre,
        anyoNacimiento: req.body.anyoNacimiento
    });

    nuevoAutor.save().then(resultado => {
        res.status(201)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(500)
           .send({ok: false, 
                  error: "Error añadiendo autor"});
    });
});

export default router;
//app.listen(8080);