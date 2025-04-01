import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoService } from "./services/FunkoService.js";
import { funkoGenre } from "./enums/FunkoGenre.js";
import { funkoType } from "./enums/FunkoType.js";
import { Funko } from "./models/FunkoPop.js";

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

yargs(hideBin(process.argv))
  .command("add", "Add a Funko", commonFunkoOptions, (argv) => {
    const service = new FunkoService(argv.username as string);
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
    service.addFunko(funko);
  })
  .command("modify", "Modify a Funko", commonFunkoOptions, (argv) => {
    const service = new FunkoService(argv.username as string);
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
    service.modifyFunko(funko);
  })
  .command(
    "remove",
    "Remove a Funko",
    {
      username: commonFunkoOptions.username,
      id: commonFunkoOptions.id,
    },
    (argv) => {
      const service = new FunkoService(argv.username as string);
      service.removeFunko(argv.id as string);
    },
  )
  .command(
    "list",
    "List all Funkos",
    { username: commonFunkoOptions.username },
    (argv) => {
      const service = new FunkoService(argv.username as string);
      service.listFunkos().forEach((funko) => funko.printInfo());
    },
  )
  .command(
    "show",
    "Show details of a Funko",
    {
      username: commonFunkoOptions.username,
      id: commonFunkoOptions.id,
    },
    (argv) => {
      const service = new FunkoService(argv.username as string);
      const funko = service.getFunko(argv.id as string);
      funko?.printInfo();
    },
  )
  .demandCommand(1, "You need at least one command before moving on")
  .help()
  .parse();
