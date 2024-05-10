const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:4200']
    }
  });

let mensajes = []
app.get('/', (req, res) => {
  res.send('<h1>Hola bro{}</h1>');
  res.send(mensajes)
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (data) => {
        console.log('Mensaje recibido:', data);
        mensajes.push(data); // Agregar el mensaje al array
        io.emit('messages', mensajes); // Enviar el array actualizado a todos los clientes conectados
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
  console.log('listeninghttp on *:3000');
});