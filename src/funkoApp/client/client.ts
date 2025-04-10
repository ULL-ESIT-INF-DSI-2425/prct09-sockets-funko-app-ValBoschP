import * as net from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { RequestType, ResponseType } from '../utils/types.js';
import { Funko } from '../models/FunkoPop.js';
import { funkoGenre } from '../enums/FunkoGenre.js';
import { funkoType } from '../enums/FunkoType.js';

/**
 * Common options for Funko Pop-related commands in the CLI.
 * These options define the required and optional parameters 
 * used when adding, modifying, or removing a Funko Pop.
 */
const commonFunkoOptions = {
  username: {
    description: "Username associated with the Funko Pop collection",
    alias: "u",
    type: "string" as const,
    demandOption: true,
  },
  id: {
    description: "Unique identifier for the Funko Pop",
    alias: "i",
    type: "string" as const,
    demandOption: true,
  },
  name: {
    description: "Name of the Funko Pop",
    alias: "n",
    type: "string" as const,
    demandOption: true,
  },
  description: {
    description: "A brief description of the Funko Pop",
    alias: "d",
    type: "string" as const,
    demandOption: true,
  },
  type: {
    description: "Type of Funko Pop",
    alias: "t",
    type: "string" as const,
    choices: Object.values(funkoType),
    demandOption: true,
  },
  genre: {
    description: "Genre associated with the Funko Pop",
    alias: "g",
    type: "string" as const,
    choices: Object.values(funkoGenre),
    demandOption: true,
  },
  franchise: {
    description: "Franchise the Funko Pop belongs to",
    alias: "f",
    type: "string" as const,
    demandOption: true,
  },
  number: {
    description: "Funko Pop's collectible number",
    alias: "num",
    type: "number" as const,
    demandOption: true,
  },
  exclusive: {
    description: "Indicates whether the Funko Pop is an exclusive edition",
    alias: "e",
    type: "boolean" as const,
    demandOption: true,
  },
  specialFeatures: {
    description: "Special features (e.g., glow-in-the-dark, metallic finish)",
    alias: "s",
    type: "string" as const,
    demandOption: true,
  },
  marketValue: {
    description: "Market value of the Funko Pop in USD",
    alias: "m",
    type: "number" as const,
    demandOption: true,
  },
};

/** 
 * The server's hostname. 
 */
const SERVER_HOST = 'localhost';

/** 
 * The port on which the server listens for incoming TCP connections.
 */
const SERVER_PORT = 4000;

/**
 * Sends a request to the Funko Pop server using a TCP connection.
 * 
 * @param request - The request object to send
 */
export const sendRequest = (request: RequestType) => {
  const client = net.createConnection({ host: SERVER_HOST, port: SERVER_PORT }, () => {
    client.write(JSON.stringify(request));
    client.end();
  });

  let responseData = '';

  client.on('data', (chunk) => {
    responseData += chunk.toString();
  });

  client.on('end', () => {
    try {
      const response: ResponseType = JSON.parse(responseData);
      console.log(chalk.green('📨 Server response:'), response);
    } catch (error) {
      console.error(chalk.red('❌ Error processing response'), error);
    }
  });

  client.on('error', (err) => {
    console.error(chalk.red('⚠️ Connection error:'), err.message);
  });
};

/**
 * Creates a Funko instance from CLI arguments.
 * 
 * @param argv - The parsed Yargs arguments
 * @returns A new Funko instance
 */
function buildFunkoFromArgs(argv: any): Funko {
  return new Funko(
    argv.id as string,
    argv.name as string,
    argv.description as string,
    argv.type as funkoType,
    argv.genre as funkoGenre,
    argv.franchise as string,
    argv.number as number,
    argv.exclusive as boolean,
    argv.specialFeatures as string,
    argv.marketValue as number,
  );
}

// CLI command configuration using Yargs
yargs(hideBin(process.argv))
  /**
   * CLI command to add a new Funko Pop to a user's collection.
   */
  .command('add', 'Add a Funko', commonFunkoOptions, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }

    const funko = buildFunkoFromArgs(argv);

    sendRequest({
      type: 'add',
      username: argv.username as string,
      funkoPop: funko,
    });
  })
  /**
   * CLI command to modify an existing Funko Pop in a user's collection.
   */
  .command('modify', 'Modify a Funko', commonFunkoOptions, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }

    const funko = buildFunkoFromArgs(argv);

    sendRequest({
      type: 'update',
      username: argv.username as string,
      funkoPop: funko,
    });
  })
  /**
   * CLI command to remove a Funko Pop from a user's collection.
   */
  .command('remove', 'Remove a Funko', { username: commonFunkoOptions.username, id: commonFunkoOptions.id }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }

    sendRequest({
      type: 'remove',
      username: argv.username as string,
      funkoPop: { id: argv.id }
    });
  })
  /**
   * CLI command to list all Funko Pops in a user's collection.
   */
  .command('list', 'List all Funkos', { username: commonFunkoOptions.username }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }
    
    sendRequest({
      type: 'list',
      username: argv.username as string,
    });
  })
  /**
   * CLI command to retrieve and display details of a specific Funko Pop.
   */
  .command('show', 'Show details of a Funko', { username: commonFunkoOptions.username, id: commonFunkoOptions.id }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }
    
    sendRequest({
      type: 'read',
      username: argv.username as string,
      funkoPop: { id: argv.id }
    });
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .parse();



// import * as net from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { RequestType, ResponseType } from '../utils/types.js';
import { Funko } from '../models/FunkoPop.js';
import { funkoGenre } from '../enums/FunkoGenre.js';
import { funkoType } from '../enums/FunkoType.js';

/**
 * Common options for Funko Pop-related commands in the CLI.
 * These options define the required and optional parameters 
 * used when adding, modifying, or removing a Funko Pop.
 */
const commonFunkoOptions = {
  username: {
    description: "Username associated with the Funko Pop collection",
    alias: "u",
    type: "string" as const,
    demandOption: true,
  },
  id: {
    description: "Unique identifier for the Funko Pop",
    alias: "i",
    type: "string" as const,
    demandOption: true,
  },
  name: {
    description: "Name of the Funko Pop",
    alias: "n",
    type: "string" as const,
    demandOption: true,
  },
  description: {
    description: "A brief description of the Funko Pop",
    alias: "d",
    type: "string" as const,
    demandOption: true,
  },
  type: {
    description: "Type of Funko Pop",
    alias: "t",
    type: "string" as const,
    choices: Object.values(funkoType),
    demandOption: true,
  },
  genre: {
    description: "Genre associated with the Funko Pop",
    alias: "g",
    type: "string" as const,
    choices: Object.values(funkoGenre),
    demandOption: true,
  },
  franchise: {
    description: "Franchise the Funko Pop belongs to",
    alias: "f",
    type: "string" as const,
    demandOption: true,
  },
  number: {
    description: "Funko Pop's collectible number",
    alias: "num",
    type: "number" as const,
    demandOption: true,
  },
  exclusive: {
    description: "Indicates whether the Funko Pop is an exclusive edition",
    alias: "e",
    type: "boolean" as const,
    demandOption: true,
  },
  specialFeatures: {
    description: "Special features (e.g., glow-in-the-dark, metallic finish)",
    alias: "s",
    type: "string" as const,
    demandOption: true,
  },
  marketValue: {
    description: "Market value of the Funko Pop in USD",
    alias: "m",
    type: "number" as const,
    demandOption: true,
  },
};

/** 
 * The server's hostname. 
 */
const SERVER_HOST = 'localhost';

/** 
 * The port on which the server listens for incoming TCP connections.
 */
const SERVER_PORT = 4000;

/**
 * Sends a request to the Funko Pop server using a TCP connection.
 * 
 * @param request - The request object to send
 */
export const sendRequest = (request: RequestType) => {
  const client = net.createConnection({ host: SERVER_HOST, port: SERVER_PORT }, () => {
    client.write(JSON.stringify(request));
    client.end();
  });

  let responseData = '';

  client.on('data', (chunk) => {
    responseData += chunk.toString();
  });

  client.on('end', () => {
    try {
      const response: ResponseType = JSON.parse(responseData);
      console.log(chalk.green('📨 Server response:'), response);
    } catch (error) {
      console.error(chalk.red('❌ Error processing response'), error);
    }
  });

  client.on('error', (err) => {
    console.error(chalk.red('⚠️ Connection error:'), err.message);
  });
};

/**
 * Creates a Funko instance from CLI arguments.
 * 
 * @param argv - The parsed Yargs arguments
 * @returns A new Funko instance
 */
function buildFunkoFromArgs(argv: any): Funko {
  return new Funko(
    argv.id as string,
    argv.name as string,
    argv.description as string,
    argv.type as funkoType,
    argv.genre as funkoGenre,
    argv.franchise as string,
    argv.number as number,
    argv.exclusive as boolean,
    argv.specialFeatures as string,
    argv.marketValue as number,
  );
}

// CLI command configuration using Yargs
yargs(hideBin(process.argv))
  /**
   * CLI command to add a new Funko Pop to a user's collection.
   */
  .command('add', 'Add a Funko', commonFunkoOptions, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }

    const funko = buildFunkoFromArgs(argv);

    sendRequest({
      type: 'add',
      username: argv.username as string,
      funkoPop: funko,
    });
  })
  /**
   * CLI command to modify an existing Funko Pop in a user's collection.
   */
  .command('modify', 'Modify a Funko', commonFunkoOptions, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }

    const funko = buildFunkoFromArgs(argv);

    sendRequest({
      type: 'update',
      username: argv.username as string,
      funkoPop: funko,
    });
  })
  /**
   * CLI command to remove a Funko Pop from a user's collection.
   */
  .command('remove', 'Remove a Funko', { username: commonFunkoOptions.username, id: commonFunkoOptions.id }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }

    sendRequest({
      type: 'remove',
      username: argv.username as string,
      funkoPop: { id: argv.id }
    });
  })
  /**
   * CLI command to list all Funko Pops in a user's collection.
   */
  .command('list', 'List all Funkos', { username: commonFunkoOptions.username }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }
    
    sendRequest({
      type: 'list',
      username: argv.username as string,
    });
  })
  /**
   * CLI command to retrieve and display details of a specific Funko Pop.
   */
  .command('show', 'Show details of a Funko', { username: commonFunkoOptions.username, id: commonFunkoOptions.id }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    }
    
    sendRequest({
      type: 'read',
      username: argv.username as string,
      funkoPop: { id: argv.id }
    });
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .parse();

