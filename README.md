# DEV BRANCH

This is the dev branch. Every Pull Request is going to be made to this branch before merging into Master.
A branch for each feature is going to be made from the dev branch, not from master.

## Frontend commands

- `npm start`: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
  - You have to be in the `/hajime` directory
- `npm i` or `npm install` to install node dependencies.

## Backend commands

We use Poetry for managing python packages.\
[Installation guide](https://python-poetry.org/docs/)\
The recommended way of installing poetry is with the curl command, but it can also be installed with pip.

- `poetry add package-name`: Add new package
  - Example: `poetry add Flask`
- `poetry add -d package-name`: Add new package in development mode
  - Example: `poetry add -d black`
- `poetry install`: Install the packages
- `poetry run <command>`: Run a command usaing a virtualenv created by poetry
  - Example: `poetry run black`
- `poetry shell`: Create a shell in the virtualenv created by poetry
  - While in this shell, you can run the python packages without the `poetry run`.

All packages can be reviewed in `server/pyproject.toml`

