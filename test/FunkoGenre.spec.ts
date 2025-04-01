import { describe, test, expect } from "vitest";
import { funkoGenre } from "../src/funkoApp/enums/FunkoGenre.js";

describe("funkoGenre Enum", () => {
  test("should have the correct value for ANIMATION", () => {
    expect(funkoGenre.ANIMATION).toBe("Animation");
  });

  test("should have the correct value for MOVIES", () => {
    expect(funkoGenre.MOVIES).toBe("Movies & TV");
  });

  test("should have the correct value for VIDEOGAMES", () => {
    expect(funkoGenre.VIDEOGAMES).toBe("Video Games");
  });

  test("should have the correct value for SPORTS", () => {
    expect(funkoGenre.SPORTS).toBe("Sports");
  });

  test("should have the correct value for ANIME", () => {
    expect(funkoGenre.ANIME).toBe("Anime");
  });

  test("should have the correct value for MUSIC", () => {
    expect(funkoGenre.MUSIC).toBe("Music");
  });
});
