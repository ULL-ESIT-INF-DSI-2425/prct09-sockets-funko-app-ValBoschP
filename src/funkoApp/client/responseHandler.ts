import chalk from 'chalk';
import { ResponseType } from '../utils/types.js'

/**
 * Handles the response received from the server and displays it appropriately
 * in the console using color-coded messages for better readability.
 *
 * @param response - The response object containing the success status, operation type, 
 *                   optional Funko Pop data, and an error message if applicable.
 */
export const handleResponse = (response: ResponseType) => {
  if (response.success) {
    console.log(chalk.green(`✓ Operation ${response.type} success.`));

    // If the response contains an array of Funko Pops, display them in a formatted manner.
    if (response.funkoPops) {
      console.log(chalk.yellow(JSON.stringify(response.funkoPops, null, 2)));
    }
  } else {
    console.log(chalk.red(`✘ Error from operation ${response.type}: ${response.message || 'Unknown'}`));
  }
};
