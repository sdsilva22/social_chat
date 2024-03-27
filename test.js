const readline = require('readline');

// Crea una interfaz para leer líneas de la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para enviar un mensaje al "chat"
function enviarMensaje(mensaje) {
  rl.write(mensaje + '\n');
}

// Función para recibir un mensaje del "chat"
function recibirMensaje(callback) {
  rl.question('> ', (respuesta) => {
    callback(respuesta);
  });
}

// Inicia el "chat"
enviarMensaje('Bienvenido al chat!');

// Bucle para recibir y enviar mensajes
while (true) {
  recibirMensaje((respuesta) => {
    enviarMensaje('Tú dices: ' + respuesta);
  });
}
