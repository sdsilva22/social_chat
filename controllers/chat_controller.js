const Chatbot = require('../models').Chatbot;
const Pregunta = require('../models').Pregunta;
// Controlador para obtener una respuesta del bot automaticamente
exports.listarChatbots = async (req, res) => {
    try {
        // Buscar todos los chatbots en la base de datos
        const chatbots = await Chatbot.find();
        // Devolver la lista de chatbots en la respuesta
        res.status(200).json({ success: true, message: 'Lista de chatbots obtenida correctamente', data: chatbots });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la lista de chatbots', error: error.message });
    }
};
exports.createChatbot = async (req, res) => {
    try {
        const { nombre, descripcion, pregunta } = req.body;

        // Buscar la pregunta en la tabla de preguntas
        const preguntaEncontrada = await Pregunta.findOne({ pregunta });
        if (!preguntaEncontrada) {
            return res.status(404).json({ success: false, message: 'No se encontró una respuesta para la pregunta proporcionada' });
        }

        // Crear el nuevo chatbot con la respuesta encontrada
        const nuevoChatbot = new Chatbot({
            nombre,
            descripcion,
            pregunta,
            respuesta: preguntaEncontrada.respuesta, // Utilizamos la respuesta encontrada en la tabla de preguntas
            contador: 0 // Inicializamos el contador en 0
        });

        // Guardar el nuevo chatbot en su propia tabla
        await nuevoChatbot.save();

        res.status(201).json({ success: true, message: 'Chatbot creado exitosamente', data: nuevoChatbot });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el chatbot', error: error.message });
    }
};
exports.preguntaChat = async (req, res) => {
    try {
        // Obtener la pregunta enviada en la solicitud POST
        const preguntaEnviada = req.body.pregunta;

        // Buscar en la base de datos la pregunta correspondiente
        const pregunta = await Pregunta.findOne({ pregunta: preguntaEnviada });
        if (!pregunta) {
            return res.status(404).json({ success: false, message: 'Pregunta no encontrada: ' + preguntaEnviada });
        }

        // Obtener el chatbot asociado a esta pregunta
        const chatbot = await Chatbot.findOne({ pregunta: preguntaEnviada });
        if (!chatbot) {
            return res.status(404).json({ success: false, message: 'Chatbot no encontrado para la pregunta: ' + preguntaEnviada });
        }

        // Incrementar el contador en 1
        chatbot.contador++;

        // Guardar los cambios en el chatbot
        await chatbot.save();

        // Devolver la respuesta asociada a esa pregunta junto con el contador actualizado
        res.status(200).json({ success: true, respuesta: pregunta.respuesta, contador: chatbot.contador });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la respuesta del chatbot', error: error.message });
    }
};







