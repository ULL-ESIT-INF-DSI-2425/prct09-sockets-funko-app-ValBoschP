# Funko App - Funko Pop Collection Management
This project is a TypeScript application that allows users to manage their Funko Pop collections using a server and client architecture based on sockets with Node.js's net module.

## Features
- **Add** Funkos to a user's collection.

- **Modify** existing Funkos.

- **Remove** Funkos.

- **Show** information about a specific Funko.

- **List** all Funkos of a user.

- **Persistent** storage using JSON files per user.

## Installation
1. Clone the repository
```bash
$ git clone https://github.com/ULL-ESIT-INF-DSI-2425/prct09-sockets-funko-app-ValBoschP.git
```
2. Install dependencies
```bash
$ pnpm install
```
3. Compile TypeScript to JavaScript
```bash
$ tsc
```
## Usage

### Start the server
```bash
node dist/funkoApp/server/server.js
```
### Client Commands
Run the following commands to interact with the server:
#### Add a Funko
Example:
```bash
ode dist/funkoApp/client/client.js add -u "Val" -i "1" -n "Goku" -d "Super Saiyan" -t "Pop!" -g "Movies & TV" -f "Dragon Ball Z" --num 14 -e "false" -s "Is Goku" -m 20
```
#### Modify a Funko
Example:
```bash
node dist/funkoApp/client/client.js update -u "Val" -i "1" -n "Goku" -d "Super Saiyan Blue" -t "Pop!" -g "Movies & TV" -f "Dragon Ball Z" --num 14 -e "false" -s "Blue Hair" -m 25
```
#### Remove a Funko
Example:
```bash
node dist/funkoApp/client/client.js remove -u "Val" -i "1"
```
#### List all Funkos
Example:
```bash
node dist/funkoApp/client/client.js list -u "Val"
```
#### Show a specific Funko
Example:
```bash
node dist/funkoApp/client/client.js show -u "Val" -i "1"
```
## Notes
- The server must be running before executing client commands.
- Each user has a separate folder in `data/` where their Funkos are stored.
- JSON is use to store each Funko's information in a file named after the Funko's ID.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/qsam7Uxz)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18876078)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2425/prct09-sockets-funko-app-ValBoschP/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2425/prct09-sockets-funko-app-ValBoschP?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2425_prct09-sockets-funko-app-ValBoschP&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2425_prct09-sockets-funko-app-ValBoschP)
[![CI Tests](https://github.com/ULL-ESIT-INF-DSI-2425/prct09-sockets-funko-app-ValBoschP/actions/workflows/ci.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2425/prct09-sockets-funko-app-ValBoschP/actions/workflows/ci.yml)