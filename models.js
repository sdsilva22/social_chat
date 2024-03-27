const mongoose = require('mongoose');

// Definición del esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});
// Definición del esquema de usuario
const preguntaSchema = new mongoose.Schema({
    pregunta: { type: String, required: true, unique: true }, // Pregunta exacta a la que responde la respuesta
    respuesta: { type: String, required: true },
});
// Definición del esquema de chatbot
const chatbotSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Nombre del chatbot
    descripcion: { type: String, required: true }, // Descripción del chatbot
    pregunta: { type: String, required: true }, // Pregunta para la que se proporciona una respuesta
    respuesta: { type: String, required: true }, // Respuesta predeterminada
    contador: { type: Number, default: 0 }, // Contador de veces que se ha preguntado esta pregunta    
});

// Creación del modelo Chatbot
const Chatbot = mongoose.model('Chatbot', chatbotSchema);
// Creación del modelo Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Pregunta = mongoose.model('Pregunta', preguntaSchema);


module.exports = { Usuario, Pregunta,Chatbot };
