import express from "express";
import mongoose from "mongoose";
import Libro from "../model/libro.js";
import Autor from "../model/autor.js";

const router = express.Router();


router.get('/', (req, res) => {
    Libro.find().populate('autor').then(resultado => {
        if(resultado)
            res.status(200)
                .send( {ok: true, 
                        resultado: resultado});
        else
            res.status(500)
                .send( {ok: false, 
                        error: "No se han encontrado libros"});

    }).catch (error => {
        res.status(500)
           .send( {ok: false, 
                   error: "No se han encontrado libros"});
    });
});
router.get('/:id', (req, res) => {
   Libro.findById(req.body.id).populate('autor').then(resultado => {
        if(resultado)
            res.status(200)
               .send({ok: true, 
                      resultado: resultado});
        else
            res.status(404)
               .send({ok: false, 
                      error: `Libro ${req.body.id} no encontrado`});
    }).catch (error => {
        res.status(404)
           .send({ok: false, 
                  error: `Libro ${req.body.id} no encontrado`});
    }); 
});

router.post('/', (req, res) => {
    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial:req.body.editorial,
        precio:req.body.precio,
        autor:req.body.autor
    });

    nuevoLibro.save().then(resultado => {
        res.status(201)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(500)
           .send({ok: false, 
                  error: "Error añadiendo libro"});
    });
});

export default router;
//app.listen(8080);