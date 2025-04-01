import * as net from 'net';
import chalk from 'chalk';
import { RequestType, ResponseType } from '../utils/types.js';
import { FunkoService } from '../services/FunkoService.js';  
import { Funko } from '../models/FunkoPop.js';

const SERVER_PORT = 4000;

const server = net.createServer((socket) => {
  console.log(chalk.blue('Client connected.'));
  
  let requestData = '';
  
  socket.on('data', (chunk) => {
    requestData += chunk.toString();
  });

  socket.on('end', () => {
    try {
      const request: RequestType = JSON.parse(requestData);

      if (!request.username) {
        console.log(chalk.red('Username is missing in the request.'));
        socket.write(JSON.stringify({ type: 'error', success: false, message: 'Username is required' }));
        socket.end();
        return;
      }

      console.log(chalk.yellow('Request received:'), request);

      const funkoService = new FunkoService(request.username);

      switch (request.type) {
        case 'add':
          if (!request.funkoPop) {
            socket.write(JSON.stringify({ type: 'error', success: false, message: 'Funko data is missing' }));
            break;
          }
          if (!request.funkoPop.id) {
            socket.write(JSON.stringify({ type: 'error', success: false, message: 'Funko ID is required' }));
            break;
          }
          funkoService.addFunko(request.funkoPop as Funko);
          socket.write(JSON.stringify({ type: 'add', success: true }));
          break;

        case 'update':
          if (!request.funkoPop) {
            socket.write(JSON.stringify({ type: 'error', success: false, message: 'Funko data is missing' }));
            break;
          }
          if (!request.funkoPop.id) {
            socket.write(JSON.stringify({ type: 'error', success: false, message: 'Funko ID is required' }));
            break;
          }
          funkoService.modifyFunko(request.funkoPop as Funko);
          socket.write(JSON.stringify({ type: 'update', success: true }));
          break;

        case 'remove':
          if (!request.funkoPop || !request.funkoPop.id) {
            socket.write(JSON.stringify({ type: 'error', success: false, message: 'Funko ID is required' }));
            break;
          }
          funkoService.removeFunko(request.funkoPop.id);
          socket.write(JSON.stringify({ type: 'remove', success: true }));
          break;

        case 'read':
          if (!request.funkoPop || !request.funkoPop.id) {
            socket.write(JSON.stringify({ type: 'error', success: false, message: 'Funko ID is required' }));
            break;
          }
          const funko = funkoService.getFunko(request.funkoPop.id);
          if (funko) {
            socket.write(JSON.stringify({ type: 'read', success: true, funkoPops: [funko] }));
          } else {
            socket.write(JSON.stringify({ type: 'read', success: false, message: 'Funko not found' }));
          }
          break;

        case 'list':
          const funkos = funkoService.listFunkos();
          socket.write(JSON.stringify({ type: 'list', success: true, funkoPops: funkos }));
          break;

        default:
          socket.write(JSON.stringify({ type: 'error', success: false, message: 'Invalid operation' }));
      }
    } catch (error) {
      console.log(chalk.red('Error processing request:', error));
      socket.write(JSON.stringify({ type: 'error', success: false, message: 'Invalid request' }));
    }
    socket.end();
  });

  socket.on('error', (err) => {
    console.error(chalk.red('Connection error:'), err.message);
  });

  socket.on('close', () => {
    console.log(chalk.gray('Client disconnected.'));
  });
});

server.listen(SERVER_PORT, () => {
  console.log(chalk.green(`Server listening on port: ${SERVER_PORT}`));
});
