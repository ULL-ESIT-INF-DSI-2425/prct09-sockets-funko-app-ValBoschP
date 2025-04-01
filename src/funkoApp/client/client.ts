import * as net from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { RequestType, ResponseType } from '../utils/types.js';
import { Funko } from '../models/FunkoPop.js';
import { funkoGenre } from '../enums/FunkoGenre.js';
import { funkoType } from '../enums/FunkoType.js';

const commonFunkoOptions = {
  username: {
    description: "Username",
    alias: "u",
    type: "string" as const,
    demandOption: true,
  },
  id: {
    description: "Funko ID",
    alias: "i",
    type: "string" as const,
    demandOption: true,
  },
  name: {
    description: "Funko Name",
    alias: "n",
    type: "string" as const,
    demandOption: true,
  },
  description: {
    description: "Funko Description",
    alias: "d",
    type: "string" as const,
    demandOption: true,
  },
  type: {
    description: "Funko Type",
    alias: "t",
    type: "string" as const,
    choices: Object.values(funkoType),
    demandOption: true,
  },
  genre: {
    description: "Funko Genre",
    alias: "g",
    type: "string" as const,
    choices: Object.values(funkoGenre),
    demandOption: true,
  },
  franchise: {
    description: "Funko Franchise",
    alias: "f",
    type: "string" as const,
    demandOption: true,
  },
  number: {
    description: "Funko Number",
    alias: "num",
    type: "number" as const,
    demandOption: true,
  },
  exclusive: {
    description: "Funko Exclusive",
    alias: "e",
    type: "boolean" as const,
    demandOption: true,
  },
  specialFeatures: {
    description: "Funko Special Features",
    alias: "s",
    type: "string" as const,
    demandOption: true,
  },
  marketValue: {
    description: "Funko Market Value",
    alias: "m",
    type: "number" as const,
    demandOption: true,
  },
};

const SERVER_HOST = 'localhost';
const SERVER_PORT = 4000;

const sendRequest = (request: RequestType) => {
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

yargs(hideBin(process.argv))
  .command('add', 'Add a Funko', commonFunkoOptions, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    };

    const funko = new Funko(
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

    sendRequest({
      type: 'add',
      username: argv.username as string,  
      funkoPop: funko
    });
  })
  .command('modify', 'Modify a Funko', commonFunkoOptions, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    };

    const funko = new Funko(
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

    sendRequest({
      type: 'update',
      username: argv.username as string,  
      funkoPop: funko
    });
  })
  .command('remove', 'Remove a Funko', { username: commonFunkoOptions.username, id: commonFunkoOptions.id }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    };

    sendRequest({
      type: 'remove',
      username: argv.username as string, 
      funkoPop: { id: argv.id }
    });
  })
  .command('list', 'List all Funkos', { username: commonFunkoOptions.username }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    };
    
    sendRequest({
      type: 'list',
      username: argv.username as string,
    });
  })
  .command('show', 'Show details of a Funko', { username: commonFunkoOptions.username, id: commonFunkoOptions.id }, (argv) => {
    if (!argv.username) {
      console.error(chalk.red('Username is required'));
      process.exit(1);
    };
    
    sendRequest({
      type: 'read',
      username: argv.username as string,
      funkoPop: { id: argv.id }
    });
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .parse();
