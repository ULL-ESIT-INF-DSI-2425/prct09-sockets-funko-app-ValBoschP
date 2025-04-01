import chalk from "chalk";

/**
 * A utility class to handle logging messages with different styles and colors.
 * This class provides static methods for logging messages at different levels
 * (information, success, and error) and formatting numerical market values with
 * color-coded output.
 */
export class Logger {
  /**
   * Logs an informational message to the console with blue text.
   * @param message - The message to be logged.
   */
  static info(message: string): void {
    console.log(chalk.blue(message));
  }

  /**
   * Logs a success message to the console with a green checkmark and text.
   * @param message - The message to be logged.
   */
  static success(message: string): void {
    console.log(chalk.green("✔ " + message));
  }

  /**
   * Logs an error message to the console with a red cross and text.
   * @param message - The message to be logged.
   */
  static error(message: string): void {
    console.log(chalk.red("✘ " + message));
  }

  /**
   * Formats a numerical market value into a string with color coding based on
   * the value's range:
   * - Red for values 10 or below.
   * - Yellow for values between 11 and 50.
   * - Blue for values between 51 and 100.
   * - Green for values above 100.
   * @param value - The market value to be formatted.
   * @returns A string representing the market value, color-coded based on its range.
   */
  static marketValue(value: number): string {
    if (value <= 10) {
      return chalk.red(value.toString());
    } else if (value <= 50) {
      return chalk.yellow(value.toString());
    } else if (value <= 100) {
      return chalk.blue(value.toString());
    } else {
      return chalk.green(value.toString());
    }
  }
}
