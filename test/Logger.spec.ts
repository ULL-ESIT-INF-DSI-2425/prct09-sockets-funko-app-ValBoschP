import { describe, test, expect, vi } from "vitest";
import chalk from "chalk";
import { Logger } from "../src/funkoApp/utils/Logger.js";

describe("Logger Class", () => {
  test("should log an informational message with blue text", () => {
    const consoleLogSpy = vi.spyOn(console, "log");
    const message = "This is an info message";

    Logger.info(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.blue(message));
  });

  test("should log a success message with green checkmark", () => {
    const consoleLogSpy = vi.spyOn(console, "log");
    const message = "This is a success message";

    Logger.success(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.green("✔ " + message));
  });

  test("should log an error message with red cross", () => {
    const consoleLogSpy = vi.spyOn(console, "log");
    const message = "This is an error message";

    Logger.error(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.red("✘ " + message));
  });

  test("should format market value correctly with red for values <= 10", () => {
    const value = 5;
    expect(Logger.marketValue(value)).toBe(chalk.red(value.toString()));
  });

  test("should format market value correctly with yellow for values between 11 and 50", () => {
    const value = 30;
    expect(Logger.marketValue(value)).toBe(chalk.yellow(value.toString()));
  });

  test("should format market value correctly with blue for values between 51 and 100", () => {
    const value = 75;
    expect(Logger.marketValue(value)).toBe(chalk.blue(value.toString()));
  });

  test("should format market value correctly with green for values > 100", () => {
    const value = 150;
    expect(Logger.marketValue(value)).toBe(chalk.green(value.toString()));
  });
});
