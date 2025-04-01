import { funkoGenre } from "../enums/FunkoGenre.js";
import { funkoType } from "../enums/FunkoType.js";

/**
 * Represents a Funko Pop collectible figure.
 */
export class Funko {
  /**
   * Creates a new Funko Pop instance.
   *
   * @param id - Unique identifier for the Funko.
   * @param name - Name of the Funko figure.
   * @param description - Description of the Funko figure.
   * @param type - Type of Funko (e.g., Pop!, Pop! Rides, Vinyl Soda).
   * @param genre - Genre of the Funko (e.g., Animation, Movies, Video Games).
   * @param franchise - The franchise or series the Funko belongs to.
   * @param number - The collectible number associated with the Funko.
   * @param exclusive - Indicates whether the Funko is an exclusive edition.
   * @param specialFeatures - Special characteristics (e.g., glow-in-the-dark, flocked).
   * @param marketValue - Estimated market value of the Funko in currency units.
   */
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public type: funkoType,
    public genre: funkoGenre,
    public franchise: string,
    public number: number,
    public exclusive: boolean,
    public specialFeatures: string,
    public marketValue: number,
  ) {}

  /**
   * Returns the current Funko instance.
   */
  get Funko(): this {
    return this;
  }

  /**
   * Prints the Funko's details to the console.
   */
  printInfo(): void {
    console.log(`
      ------------------------
      ID: ${this.id}
      Name: ${this.name}
      Description: ${this.description}
      Type: ${this.type}
      Genre: ${this.genre}
      Franchise: ${this.franchise}
      Number: ${this.number}
      Exclusive: ${this.exclusive}
      Special Features: ${this.specialFeatures}
      Market Value: ${this.marketValue} €
    `);
  }
}
