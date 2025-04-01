import { RequestType, ResponseType } from '../utils/types.js';
import { FunkoService } from '../services/FunkoService.js';
import { Funko } from '../models/FunkoPop.js';

/**
 * Procesa una solicitud y devuelve una respuesta.
 */
export const processRequest = (request: RequestType, callback: (response: ResponseType) => void) => {
  if (!request.username) {
    return callback({ type: 'error', success: false, message: 'Username is required' });
  }

  const funkoService = new FunkoService(request.username); // Usar username de la solicitud

  // Verificar que la solicitud tenga un FunkoPop
  if (!request.funkoPop) {
    return callback({ type: 'error', success: false, message: 'Not enough data' });
  }

  // Verificar que el id esté presente en el FunkoPop
  if (!request.funkoPop.id) {
    return callback({
      type: 'error',
      success: false,
      message: 'Funko ID is required for adding, updating, or removing a Funko Pop.'
    });
  }

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

    case 'read':
      const funko = funkoService.getFunko(request.funkoPop.id);
      return callback(funko
        ? { type: 'read', success: true, funkoPops: [funko] }
        : { type: 'read', success: false, message: 'Funko not found' }
      );

    case 'list':
      return callback({ type: 'list', success: true, funkoPops: funkoService.listFunkos() });

    default:
      return callback({ type: 'error', success: false, message: 'Invalid operation' });
  }
};
