const express = require('express');

const router = express.Router();
const preguntasController = require('./controllers/pregunta_controller'); // Importa el controlador de preguntas
const chatController = require('./controllers/chat_controller'); // Importa el controlador de preguntas


// Rutas para preguntas
router.post('/preguntasCrear', preguntasController.createPregunta); 
router.get('/preguntasListar', preguntasController.getPreguntas); 
router.get('/preguntas/:id', preguntasController.getPreguntaById); 
router.put('/preguntas/:id', preguntasController.updatePregunta);
router.delete('/preguntas/:id', preguntasController.deletePregunta);

// Rutas para chat
router.post('/chatCrear', chatController.createChatbot); 
router.post('/chat', chatController.preguntaChat); 
router.get('/listarChatbots', chatController.listarChatbots);

module.exports = router;
