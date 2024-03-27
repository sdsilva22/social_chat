const Pregunta = require('../models').Pregunta; // Importa el modelo de Pregunta

// Controlador para crear una pregunta
exports.createPregunta = async (req, res) => {
    try {
        const nuevaPregunta = new Pregunta(req.body);
        await nuevaPregunta.save();
        res.status(201).json({ success: true, message: 'Pregunta creada exitosamente', data: nuevaPregunta });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la pregunta', error: error.message });
    }
};

// Controlador para obtener todas las preguntas
exports.getPreguntas = async (req, res) => {
    try {
        const preguntas = await Pregunta.find();
        res.status(200).json({ success: true, data: preguntas });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las preguntas', error: error.message });
    }
};

// Controlador para obtener una pregunta por su ID
exports.getPreguntaById = async (req, res) => {
    try {
        const pregunta = await Pregunta.findById(req.params.id);
        if (!pregunta) {
            return res.status(404).json({ success: false, message: 'Pregunta no encontrada' });
        }
        res.status(200).json({ success: true, data: pregunta });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la pregunta', error: error.message });
    }
};

// Controlador para actualizar una pregunta por su ID
exports.updatePregunta = async (req, res) => {
    try {
        const pregunta = await Pregunta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pregunta) {
            return res.status(404).json({ success: false, message: 'Pregunta no encontrada' });
        }
        res.status(200).json({ success: true, message: 'Pregunta actualizada exitosamente', data: pregunta });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar la pregunta', error: error.message });
    }
};

// Controlador para eliminar una pregunta por su ID
exports.deletePregunta = async (req, res) => {
    try {
        const pregunta = await Pregunta.findByIdAndDelete(req.params.id);
        if (!pregunta) {
            return res.status(404).json({ success: false, message: 'Pregunta no encontrada' });
        }
        res.status(200).json({ success: true, message: 'Pregunta eliminada exitosamente', data: pregunta });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar la pregunta', error: error.message });
    }
};
