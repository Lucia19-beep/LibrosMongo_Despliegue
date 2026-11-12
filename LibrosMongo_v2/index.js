/*
Ejercicio de práctica con las diferentes opciones que ofrece Mongoose
para gestionar documentos y colecciones en MongoDB
*/

// Ejercicio 1: instalar Mongoose, cargarlo en la aplicación, 
// conectar con la base de datos y 
// definir el esquema y modelo de la colección de libros

const mongoose = require('mongoose');
const Libro = require('./model/libro');
const Autor = require('./model/autor');

mongoose.connect('mongodb://127.0.0.1:27017/libros');

// Ejercicio 2: insertar un par de libros válidos

/* Comentamos este código para esta versión del ejercicio

let libro1 = new Libro({
    titulo: "El capitán Alatriste",
    editorial: "Alfaguara",
    precio: 15
});
libro1.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

let libro2 = new Libro({
    titulo: "El juego de Ender",
    editorial: "Ediciones B",
    precio: 8.95
});
libro2.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});
*/

// Ejercicio 3: búsquedas de libros
// Buscar libros entre 10 y 20 euros
// Buscar libro por ID (cambiar el id por uno válido para probar)

Libro.find({precio: {$gte: 10, $lte: 20}}).then(resultado => {
    console.log("Resultado de la búsqueda por precios:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

Libro.findById("6a75ea75b2a96388bf1af0d7").then(resultado => {
    console.log("Resultado de la búsqueda por id:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

// Ejercicio 4: Borrado y modificación de libros
// Se debe mostrar por consola el libro borrado/modificado
// Modificar los id por otros válidos en la colección indicada

Libro.findByIdAndDelete("6a75ea75b2a96388bf1af0d7").then(resultado => {
    console.log("Libro eliminado:", resultado);
}).catch(error => {
    console.log("ERROR eliminando libro:", error)
});

Libro.findByIdAndUpdate("6a75ea75b2a96388bf1af0d8", 
{$set: {precio: 50}, $inc: {__v: 1}}, {returnDocument:'after'}).then(resultado => {
    console.log("Libro actualizado correctamente:", resultado);
}).catch(error => {
    console.log("ERROR actualizando libro:", error);
});

/*libro1.comentarios.push({
    nick:'Minecraft',
    comentario:'blablablabla'
})*/
//console.log(libro1);


// 1. Instancias de autores
let autor1 = new Autor({ nombre: 'Orson Scott Card', anyoNacimiento: 1956 });
let autor2 = new Autor({ nombre: 'Stephen King', anyoNacimiento: 1947 });
let autor3 = new Autor({ nombre: 'Federico García Lorca', anyoNacimiento: 1898 });

// 2. Guardar los 3 autores
Promise.all([autor1.save(), autor2.save(), autor3.save()])
  .then(autoresGuardados => {
    const [a1, a2, a3] = autoresGuardados;

    // 3. Crear los libros vinculados a sus autores
    let libro1 = new Libro({
      titulo: 'Saga de la Sombra',
      editorial: 'aahahhakja',
      precio: 25,
      autor: a1._id
    });

    let libro2 = new Libro({
      titulo: 'Carrie',
      editorial: 'aahahhakja',
      precio: 22,
      autor: a2._id
    });

    let libro3 = new Libro({
      titulo: 'Bodas de Sangre',
      editorial: 'aahahhakja',
      precio: 9,
      autor: a3._id
    });

    libro1.comentarios.push({
      nick: 'Minecraft',
      comentario: 'blablablabla'
    });

    // Guardar libros y retornar la promesa encadenada
    return Promise.all([libro1.save(), libro2.save(), libro3.save()]);
  })
  .then(librosGuardados => {
    console.log('Todos los libros se han guardado con éxito.');

    // 4. PASO SIGUIENTE: Buscar libros de menos de 10€
    return Libro.find({ precio: { $lt: 10 } });
  })
  .then(librosBaratos => {
    // Extraer los IDs de los autores encontrados
    let idsAutores = librosBaratos.map(libro => libro.autor);

    // Buscar los datos de esos autores en la BD
    return Autor.find({ _id: { $in: idsAutores } });
  })
  .then(resultadoAutores => {
    let nombresAutores = resultadoAutores.map(autor => autor.nombre);
    
    // RESULTADO FINAL ESPERADO: ['Federico García Lorca']
    console.log("Autores con libros a menos de 10 euros: ", nombresAutores);
  })
  .catch(error => {
    console.error('Error durante la operación:', error);
  });
    
//Ejercicio 3
//Consulta que muestre los nombres de los autores que tengan algún libro a la venta por menos de 10 euros 

Libro.find({precio: {$lt:10}}).then(resultadoLibros => {
    let idsAutores=resultadoLibros.map(libro => libro.autor);
    Autor.find({_id: {$in: idsAutores}}).then(resultadoFinal=>{
        let nombresAutores=resultadoFinal.map(autor => autor.nombre);
            console.log("Autores con libros a menos de 10 euros: " ,nombresAutores);
        })
    });

//Ejercicio 4
// 3 libros más baratos, ordenados de menor a mayor precio. 
// En el caso de que haya menos de tres libros en el listado, se mostrarán sólo los libros disponibles, obviamente.

Libro.find()
.sort('precio')
.limit(3)
.select('titulo precio')
.then(resultado => {
    console.log("3 libros más baratos: " ,resultado);
})
.catch(error => {
    console.log("Error durante la operación: " ,error);
});

// Ejercicio 5
// Consultas adicionales
/*
// Buscar libros por editorial
const editorialBuscada = 'Alfaguara'; // Cambia esto para probar con otras editoriales
Libro.find({ editorial: editorialBuscada }).select('titulo editorial')
  .then(libros => console.log("Libros por editorial:\n", libros))
  .catch(error => console.error(error));

// Filtrar libros ordenados por rango de precios
const precioMin = 5;
const precioMax = 20;
Libro.find({ precio: { $gte: precioMin, $lte: precioMax } })
  .sort({ precio: -1 })
  .then(libros => console.log("Libros por rango de precios:\n", libros))
  .catch(error => console.error(error));
*/
// Libros sin comentarios
/*
Libro.find({
  $or: [
    { comentarios: { $exists: false } }, // El campo no existe
    { comentarios: { $size: 0 } },       // Existe y es un array vacío
    { comentarios: null }                // Existe pero es null (por si acaso)
  ]
})
.then(libros => console.log("Libros sin comentarios:\n", libros))
.catch(error => console.error(error));
*/

/*
// Actualización masiva de precios
Libro.updateMany({ editorial: editorialBuscada }, { $mul: { precio: 1.10 } })
  .then(result => console.log("Actualización de precios:\n", result))
  .catch(error => console.error(error));

// Buscar libros por autor nacido en un rango de años
const anioInicio = 1950;
const anioFin = 1980;
Autor.find({ anioNacimiento: { $gte: anioInicio, $lte: anioFin } })
  .then(autores => {
    const idsAutores = autores.map(autor => autor._id);
    return Libro.find({ autor: { $in: idsAutores } });
  })
  .then(libros => console.log("Libros por rango de años de autor:\n", libros))
  .catch(error => console.error(error));

// Listar los comentarios de un libro específico
const libroId = 'ID_DEL_LIBRO_A_CONSULTAR'; // Sustituye con el ID de un libro
Libro.findById(libroId).select('titulo comentarios')
  .then(libro => console.log("Comentarios de un libro específico:\n", libro))
  .catch(error => console.error(error));
*/
