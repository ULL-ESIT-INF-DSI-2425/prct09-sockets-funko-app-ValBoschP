import { RequestType, ResponseType } from '../utils/types.js';
import { FunkoService } from '../services/FunkoService.js';
import { Funko } from '../models/FunkoPop.js';

/**
 * Processes a client request and executes the corresponding operation
 * using the FunkoService. The response is passed to the provided callback function.
 *
 * @param request - The request object containing the operation type, username, and Funko Pop data.
 * @param callback - A callback function that receives the response after processing the request.
 */
export const processRequest = (request: RequestType, callback: (response: ResponseType) => void) => {
  // Validate that the request contains a username
  if (!request.username) {
    return callback({ type: 'error', success: false, message: 'Username is required' });
  }

  // Initialize the FunkoService for the given username
  const funkoService = new FunkoService(request.username);

  // Validate that the request contains Funko Pop data when required
  if (!request.funkoPop) {
    return callback({ type: 'error', success: false, message: 'Not enough data' });
  }

  // Ensure that an ID is provided for operations that require it
  if (!request.funkoPop.id) {
    return callback({
      type: 'error',
      success: false,
      message: 'Funko ID is required for adding, updating, or removing a Funko Pop.'
    });
  }

  // Process the request based on the specified operation type
  switch (request.type) {
    case 'add':
      funkoService.addFunko(request.funkoPop as Funko);
      return callback({ type: 'add', success: true });

    case 'update':
      funkoService.modifyFunko(request.funkoPop as Funko);
      return callback({ type: 'update', success: true });

    case 'remove':
      funkoService.removeFunko(request.funkoPop.id);
      return callback({ type: 'remove', success: true });

    case 'read': {
      const funko = funkoService.getFunko(request.funkoPop.id);
      return callback(funko
        ? { type: 'read', success: true, funkoPops: [funko] }
        : { type: 'read', success: false, message: 'Funko not found' }
      );
    }

    case 'list':
      return callback({ type: 'list', success: true, funkoPops: funkoService.listFunkos() });

    default:
      return callback({ type: 'error', success: false, message: 'Invalid operation' });
  }
};
