import { describe, test, expect } from "vitest";
import { funkoType } from "../src/funkoApp/enums/FunkoType.js";

describe("funkoType Enum", () => {
  test("should have the correct value for POP", () => {
    expect(funkoType.POP).toBe("Pop!");
  });

  test("should have the correct value for POP_RIDES", () => {
    expect(funkoType.POP_RIDES).toBe("Pop! Rides");
  });

  test("should have the correct value for VYNIL_SODA", () => {
    expect(funkoType.VYNIL_SODA).toBe("Vinyl Soda");
  });

  test("should have the correct value for VYNIL_GOLD", () => {
    expect(funkoType.VYNIL_GOLD).toBe("Vinyl Gold");
  });
});
