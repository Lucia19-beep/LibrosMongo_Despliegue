const mongoose = require('mongoose');
const Autor = require('./autor');
const { type } = require('node:os');

let comentarioSchema= new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now,
        required: true
      },
    nick: {
        type: String,
        required: true
      },  
    comentario: {
        type: String,
        required: true
      }
});
let libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
        trim: true          // Esto no se pedía en el enunciado
    },
    editorial: {
        type: String
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autores'
    },
    comentarios:[comentarioSchema]
});

let Libro = mongoose.model('libro', libroSchema);
module.exports = Libro;