# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

1. Install Docker
   You can verify that docker is ready by running the following commands in your terminal
   ```sh
   docker -v
   # and
   docker-compose -v
   ```
2. Run docker from the project root directory to start Anything's backend and frontend.
   ```sh
   # in project root
   docker-compose up
   ```

3. Test that backend is running by visiting [http://localhost:3000/api/ping](http://localhost:3000/api/ping)

4. Test that frontend is running by visiting [http://localhost:3001/register](http://localhost:3001/register)