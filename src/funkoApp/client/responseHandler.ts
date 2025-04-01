import chalk from 'chalk';
import { ResponseType } from '../utils/types.js'

export const handleResponse = (response: ResponseType) => {
  if (response.success) {
    console.log(chalk.green(`✓ Operation ${response.type} success.`));
    if (response.funkoPops) {
      console.log(chalk.yellow(JSON.stringify(response.funkoPops, null, 2)));
    }
  } else {
    console.log(chalk.red(`✘ Error from operatation ${response.type}: ${response.message || 'Unknown'}`));
  }
};