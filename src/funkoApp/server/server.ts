import * as net from 'net';
import { processRequest } from './requestProcessor.js';
import { ResponseType, RequestType } from '../utils/types.js';
import chalk from 'chalk';

const SERVER_PORT = 4000;

const server = net.createServer((socket) => {
  console.log(chalk.blue('Client connected.'));
  
  // Variable para almacenar el username
  let username: string | null = null;
  let requestData = '';

  // Recibir datos del cliente
  socket.on('data', (chunk) => {
    requestData += chunk.toString();
  });

  // Cuando se cierra la conexión del socket (fin de la transmisión de datos)
  socket.on('end', () => {
    try {
      const request: RequestType = JSON.parse(requestData);

      // Si el cliente aún no ha proporcionado un username, se lo pedimos
      if (!request.username) {
        console.log(chalk.red('Username is missing in the request.'));
        socket.write(JSON.stringify({ type: 'error', success: false, message: 'Username is required'}));
        socket.end();
        return;
      }
      if (!username) {
        username = request.username;
        console.log(chalk.yellow(`User ${username} connected.`));
      }

      console.log(chalk.yellow('Request received:'), request);

      // Procesar la solicitud
      processRequest(request, (response: ResponseType) => {
        socket.write(JSON.stringify(response));  // Enviar respuesta al cliente
        socket.end();  // Cerrar la conexión después de responder
      });
    } catch (error) {
      console.log(chalk.red('Error processing request:', error));
      socket.write(JSON.stringify({ type: 'error', success: false, message: 'Invalid request' }));
      socket.end();  // Cerrar la conexión en caso de error
    }
  });

  // Manejo de errores en la conexión
  socket.on('error', (err) => {
    console.error(chalk.red('Connection error:'), err.message);
  });

  // Cuando el cliente cierra la conexión
  socket.on('close', () => {
    console.log(chalk.gray('Client disconnected.'));
  });
});

// Iniciar el servidor
server.listen(SERVER_PORT, () => {
  console.log(chalk.green(`Server listening on port: ${SERVER_PORT}`));
});
