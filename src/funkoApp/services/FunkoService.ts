import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { Funko } from "../models/FunkoPop.js";
import { Logger } from "../utils/Logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Service class for managing Funko Pop collectibles.
 *
 * This service provides methods for adding, modifying, removing, retrieving,
 * and listing Funko Pop figures, with data persistence in JSON files.
 */
export class FunkoService {
  private userDir: string;

  /**
   * Creates a new FunkoService instance for a specific user.
   *
   * @param username - The name of the user who owns the Funko collection.
   */
  constructor(private username: string) {
    this.userDir = path.join(__dirname, "..", "..", "data", this.username);
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
  }

  /**
   * Gets the file path for a specific Funko Pop based on its ID.
   *
   * @param funkoId - The unique identifier of the Funko.
   * @returns The file path where the Funko data is stored.
   */
  private getFunkoFilePath(funkoId: string): string {
    return path.join(this.userDir, `${funkoId}.json`);
  }

  /**
   * Adds a new Funko Pop to the collection.
   *
   * @param funko - The Funko Pop details, excluding the ID (which is generated automatically).
   */
  addFunko(funko: Funko): void {
    const newFunko = new Funko(
      funko.id,
      funko.name,
      funko.description,
      funko.type,
      funko.genre,
      funko.franchise,
      funko.number,
      funko.exclusive,
      funko.specialFeatures,
      funko.marketValue,
    );

    const filePath = this.getFunkoFilePath(funko.id);
    fs.writeFileSync(filePath, JSON.stringify(newFunko, null, 2));
    Logger.success(`Funko ${newFunko.name} added successfully with ID ${funko.id}.`);
  }

  /**
   * Modifies an existing Funko Pop in the collection.
   *
   * @param funko - The updated Funko object.
   */
  modifyFunko(funko: Funko): void {
    const filePath = this.getFunkoFilePath(funko.id);
    if (!fs.existsSync(filePath)) {
      Logger.error(`Funko with ID ${funko.id} does not exist.`);
      return;
    }
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
    Logger.success(`Funko ${funko.name} modified successfully.`);
  }

  /**
   * Removes a Funko Pop from the collection.
   *
   * @param funkoId - The unique identifier of the Funko to remove.
   */
  removeFunko(funkoId: string): void {
    const filePath = this.getFunkoFilePath(funkoId);
    if (!fs.existsSync(filePath)) {
      Logger.error(`Funko with ID ${funkoId} does not exist.`);
      return;
    }
    fs.unlinkSync(filePath);
    Logger.success(`Funko with ID ${funkoId} removed successfully.`);
  }

  /**
   * Lists all Funkos in the collection.
   *
   * @returns An array of all Funko Pop figures stored for the user.
   */
  listFunkos(): Funko[] {
    const files = fs.readdirSync(this.userDir);
    const funkos: Funko[] = [];
  
    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const data = fs.readFileSync(path.join(this.userDir, file), 'utf-8');
        const jsonData = JSON.parse(data);
        
        const funko = new Funko(
          jsonData.id,
          jsonData.name,
          jsonData.description,
          jsonData.type,
          jsonData.genre,
          jsonData.franchise,
          jsonData.number,
          jsonData.exclusive,
          jsonData.specialFeatures,
          jsonData.marketValue
        );
        
        funkos.push(funko);
      }
    });
  
    return funkos;
  }
  

  /**
   * Retrieves a specific Funko Pop from the collection.
   *
   * @param funkoId - The unique identifier of the Funko.
   * @returns The Funko object if found, otherwise `undefined`.
   */
  getFunko(funkoId: string): Funko | undefined {
    const filePath = this.getFunkoFilePath(funkoId);
    if (!fs.existsSync(filePath)) {
      Logger.error(`Funko with ID ${funkoId} does not exist.`);
      return undefined;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return new Funko(
      data.id,
      data.name,
      data.description,
      data.type,
      data.genre,
      data.franchise,
      data.number,
      data.exclusive,
      data.specialFeatures,
      data.marketValue,
    );
  }
}
