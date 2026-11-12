import express from 'express';
import mongoose from 'mongoose';

import routerLibros from './routes/libros.js';
import routerAutores from './routes/autores.js';

import 'dotenv/config';
const DB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/libros";
mongoose.connect(DB_URI);

let app = express();
app.use(express.json());

app.use('/libros', routerLibros);
app.use('/autores', routerAutores);

app.listen(8080);

