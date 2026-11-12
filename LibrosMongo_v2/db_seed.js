import 'dotenv/config';
import mongoose from 'mongoose';
import Autor from './model/autor.js';
import Libro from './model/libro.js';

const URL_BD = process.env.URL_BD || 'mongodb://127.0.0.1:27017/libros';

const seedDatabase = async () => {
    try {
        console.log(`Conectando a la base de datos en ${URL_BD}...`);
        await mongoose.connect(URL_BD);
        console.log('Conexión establecida con éxito.');

        // Limpieza de datos previos
        console.log('Limpiando colecciones existentes...');
        await Autor.deleteMany({});
        await Libro.deleteMany({});

        // Crear autores distintos
        console.log('Insertando autores de prueba...');
        const autores = await Autor.insertMany([
            {
                nombre: 'Stephen King',
                anyoNacimiento: 1947,
            },
            {
                nombre: 'J.K. Rowling',
                anyoNacimiento: 1965
            },
            {
                nombre: 'H.D. Cartlon',
                anyoNacimiento: 1996
            }
        ]);

        console.log(`Se han insertado ${autores.length} autores.`);

        // 2. Crear al menos 3 libros con distintos tipos de autores cada uno,
        // asociando a cada uno un autor distinto
        console.log('Insertando libros de prueba...');
        const libros = await Libro.insertMany([
            {
                titulo: 'Bodas de Sangre',
                editorial: 'Vicens Vives',
                precio: 10,
                autor: [
                    {nombre:'Federico García Lorca' ,anyoNacimiento:1898}
                ]
            },
            {
                titulo: 'La vida del Buscón',
                editorial: 'Vicens Vives',
                precio: 5,
                autor: [
                    {nombre:'Quevedo' ,anyoNacimiento:1580}
                ]
            },
            {
                titulo: 'Nada',
                editorial: 'Austral',
                precio: 15,
                autor: [
                    {nombre:'Carmen Laforet' ,anyoNacimiento:1921}
                ]
            }
        ]);

        console.log(`Se han insertado ${libros.length} libros correctamente.`);
        console.log('Seed completado con éxito.');
    } catch (error) {
        console.error('Error durante la inserción de datos de prueba:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Conexión con MongoDB cerrada.');
    }
};

seedDatabase();

