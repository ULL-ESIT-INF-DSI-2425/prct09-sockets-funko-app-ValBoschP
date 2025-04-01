import { describe, test, vi, expect } from 'vitest';
import * as net from 'net';
import chalk from 'chalk';
import { sendRequest } from '../src/funkoApp/client/client.js';
import { RequestType } from '../src/funkoApp/utils/types.js';
import { funkoType } from '../src/funkoApp/enums/FunkoType.js';
import { funkoGenre } from '../src/funkoApp/enums/FunkoGenre.js';

// Mock de net.createConnection
vi.mock('net', () => {
  return {
    createConnection: vi.fn(() => {
      return {
        write: vi.fn(),
        end: vi.fn(),
        on: vi.fn(),
      };
    }),
  };
});

describe('Client Request Tests', () => {
  test('sendRequest should send the correct data to the server', () => {
    const mockRequest: RequestType = {
      type: 'add',
      username: 'Val',
      funkoPop: {
        id: '1',
        name: 'Goku',
        description: 'Super Saiyan',
        type: funkoType.POP,
        genre: funkoGenre.ANIME,
        franchise: 'Dragon Ball Z',
        number: 14,
        exclusive: false,
        specialFeatures: 'Is Goku',
        marketValue: 20,
      },
    };

    sendRequest(mockRequest);
    
    const createConnectionMock = vi.mocked(net.createConnection);
    expect(createConnectionMock).toHaveBeenCalledWith({ host: 'localhost', port: 4000 });

    const clientMock = createConnectionMock.mock.results[0].value;
    expect(clientMock.write).toHaveBeenCalledWith(JSON.stringify(mockRequest));
    expect(clientMock.end).toHaveBeenCalled();
  });
});
