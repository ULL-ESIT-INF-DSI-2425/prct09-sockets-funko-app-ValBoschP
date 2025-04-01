import * as net from 'net';
import chalk from 'chalk';
import { RequestType, ResponseType } from '../utils/types.js';
import { FunkoService } from '../services/FunkoService.js';  
import { Funko } from '../models/FunkoPop.js';

const SERVER_PORT = 4000;

/**
 * Creates a TCP server that listens for client connections, processes Funko Pop requests,
 * and responds accordingly. The server handles adding, updating, removing, retrieving,
 * and listing Funko Pops for a specific user.
 */
const server = net.createServer((socket) => {
  console.log(chalk.blue('Client connected.'));
  
  let requestData = '';

  /**
   * Event listener for incoming data from the client. The received chunks are accumulated
   * into `requestData` until the transmission ends.
   */
  socket.on('data', (chunk) => {
    requestData += chunk.toString();
  });

  /**
   * Event listener triggered when the client ends the data transmission.
   * The server attempts to parse and process the received request.
   */
  socket.on('end', () => {
    try {
      const request: RequestType = JSON.parse(requestData);

      // Validate that the request contains a username
      if (!request.username) {
        console.log(chalk.red('Username is missing in the request.'));
        socket.write(JSON.stringify({ type: 'error', success: false, message: 'Username is required' }));
        socket.end();
        return;
      }

      console.log(chalk.yellow('Request received:'), request);

      // Initialize FunkoService for the given user
      const funkoService = new FunkoService(request.username);

      // Process the request based on its type
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

  /**
   * Event listener for handling socket errors, such as connection failures.
   * Displays an error message in the console.
   */
  socket.on('error', (err) => {
    console.error(chalk.red('Connection error:'), err.message);
  });

  /**
   * Event listener triggered when the client disconnects from the server.
   */
  socket.on('close', () => {
    console.log(chalk.gray('Client disconnected.'));
  });
});

/**
 * Starts the TCP server and begins listening on the specified port.
 */
server.listen(SERVER_PORT, () => {
  console.log(chalk.green(`Server listening on port: ${SERVER_PORT}`));
});
