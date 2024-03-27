// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chatbotController = require('./controllers/chatbotController');

var password = '5i8Bjl9u3ghE3nmB';

chatbotController.getPasswordServer


const router = express.Router();
router.post('/chatbots', chatbotController.create);
module.exports = router;

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Cambia la URI de conexión por tu propia URI de MongoDB
const mongoURI = "mongodb+srv://sdsilva2210:" + password + "@sebastiancluster.1h096ht.mongodb.net/";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// Rutas para los endpoints
app.post('/chatbots', chatbotController.create);
app.get('/chatbots', chatbotController.getAll);
app.delete('/chatbots/:id', chatbotController.delete);
app.post('/chatbots/:id/ask', chatbotController.ask);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
