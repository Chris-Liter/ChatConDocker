const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origins: ['*']
    }
  });

const mensajes = []; // Declaración de la variable mensajes fuera de la función de callback

//

app.get('/', (req, res) => {
  res.send('<h1>Hola bro</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (data) => {
        console.log('Mensaje recibido:', data);
        if (!mensajes.includes(data)) { // Verifica si el mensaje ya existe en el arreglo
            mensajes.push(data); // Agregar el mensaje al array solo si no existe
        }
        io.emit('message', mensajes); // Enviar el array actualizado a todos los clientes conectados
    });
    

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
  console.log('listeninghttp on *:3000');
});
