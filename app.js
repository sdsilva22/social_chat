const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
var password = '5i8Bjl9u3ghE3nmB';


// Cambia la URI de conexión por tu propia URI de MongoDB
const mongoURI = "mongodb+srv://sdsilva2210:" + password + "@sebastiancluster.1h096ht.mongodb.net/";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
