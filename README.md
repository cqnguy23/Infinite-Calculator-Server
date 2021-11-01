## Getting started

### Setting up a project

- Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
- Clone this repository: `git clone https://github.com/cqnguy23/Infinite-Calculator-Server YOUR_PROJECT_NAME`
- Move into the project directory: `cd YOUR_PROJECT_NAME`
- Install the dependencies: `npm install`

### Working on the project

- Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
- Create an .env file and add the following lines:
  - `PORT = YOUR_CHOSEN_PORT`
  - `DATABASE_URI = YOUR_DATABASE_URI`
- Run the development task: `npm run dev`
  - Starts a server running at http://localhost:YOUR_CHOSEN_PORT
  - Automatically restarts when any of your files change
