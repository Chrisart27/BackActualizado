// Esto se usa para procesar la carga de archivos y que quede almacenado en el storage, o sea, en memoria. 
//Posible funcion para las imagenes 

const multer = require('multer');

const storage = multer.memoryStorage(); // Puedes ajustar esto según tus necesidades
const upload = multer({ storage: storage });

module.exports = upload;
