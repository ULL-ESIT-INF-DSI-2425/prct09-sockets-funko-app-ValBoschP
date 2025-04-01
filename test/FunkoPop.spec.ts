import { describe, test, expect, vi } from "vitest";
import { funkoGenre } from "../src/funkoApp/enums/FunkoGenre.js";
import { funkoType } from "../src/funkoApp/enums/FunkoType.js";
import { Funko } from "../src/funkoApp/models/FunkoPop.js";

describe("Funko Class", () => {
  const testFunko = new Funko(
    "1",
    "Batman",
    "A Funko figure of Batman from DC Comics.",
    funkoType.POP,
    funkoGenre.MOVIES,
    "DC Comics",
    1,
    true,
    "Glow-in-the-dark",
    50,
  );

  test("should create a Funko instance with correct properties", () => {
    expect(testFunko.id).toBe("1");
    expect(testFunko.name).toBe("Batman");
    expect(testFunko.description).toBe(
      "A Funko figure of Batman from DC Comics.",
    );
    expect(testFunko.type).toBe(funkoType.POP);
    expect(testFunko.genre).toBe(funkoGenre.MOVIES);
    expect(testFunko.franchise).toBe("DC Comics");
    expect(testFunko.number).toBe(1);
    expect(testFunko.exclusive).toBe(true);
    expect(testFunko.specialFeatures).toBe("Glow-in-the-dark");
    expect(testFunko.marketValue).toBe(50);
  });

  test("should return the current Funko instance with the Funko getter", () => {
    expect(testFunko.Funko).toBe(testFunko);
  });

  test("should print the Funko info correctly", () => {
    const consoleLogSpy = vi.spyOn(console, "log");
    testFunko.printInfo();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("ID: 1"),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Name: Batman"),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Description: A Funko figure of Batman from DC Comics.",
      ),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Type: Pop!"),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Genre: Movies & TV"),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Franchise: DC Comics"),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Number: 1"),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Exclusive: true"),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Special Features: Glow-in-the-dark"),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Market Value: 50"),
    );
  });
});
