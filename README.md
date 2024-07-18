# NYT Most Popular

Built with React and TailwindCSS, this Web Application allows you to check out the most popular news articles on the New York Times.

# Running Locally
## Installing Dependencies
In order to run the application, please clone it to your  system. Make sure you have Node installed.
After cloning, navigate inside the `nyt-most-popular` directory and run:

```bash
yarn
```
This will add all the necessary dependencies for the project. In case you do not have `yarn` installed - please follow [these instructions](https://classic.yarnpkg.com/lang/en/docs/install) to install it.

## Environment Variables
This project relies on the New York Times API, which requires an API key. [Here's how you can get one](https://developer.nytimes.com/get-started).

After you have your API key, create a `.env` file at the root of the project and paste the following in it:

```bash
REACT_APP_NYT_API_KEY=<YOUR_API_KEY> # Replace <YOUR_API_KEY> with your NYT API Key.
```

## Running The Application
After installing the dependencies, run:
```bash
yarn start
```

This will spin up the local server at http://localhost:3000 and serve the web application.

# Testing
## Unit Tests
In order to run unit tests with Jest and React Testing Library, run:
```bash
yarn test
```

The results of Unit Testing will be printed to the terminal.

## Coverage Report
In order to generate the Coverage Report, run:
```bash
yarn coverage
```

This will generate the coverage report at `/coverage/index.html`.

## Cypress E2E Testing
In order to conduct E2E tests with Cypress, please ensure you are running the application first with `yarn start`.

## Using the Cypress GUI
The Cypress GUI can be utilized to proceed with the E2E tests. Simply run:

```bash
yarn cypress:open
```

This will open the Cypress window - please choose E2E Testing. This will prompt you to choose select a browser to run the tests on. Select your preferred browser, and the click the "Start E2E Testing in Electron" button.

Once the browser launches, select `nyt_articles_spec.cy.ts` from the list. This file is available under `/cypress/e2e/`. Selecting the file will initiate the E2E tests.

## Headless Testing

For headless testing, simply run `yarn cypress:run`. This will run the E2E tests headlessly (that is, without opening a browser) and print the results of tests in the terminal itself.

# Building The Application
In order to build the application, run:
```bash
yarn build
```

The output will be available at `/build`.

# SonarQube Code Quality Summary
If you are interested in generating a summary for code quality, please follow these instructions:

## Setup Local SonarQube
Download and setup SonarQube from [here](https://www.sonarsource.com/products/sonarqube/downloads/).

## Start Local SonarQube Server
First, navigate to the SonarQube installation directory, and then run the start script in the `bin` folder for your operating system.


## Using The SonarQube UI:
Open your browser and go to http://localhost:9000, log in with the default credentials ("admin" and "admin"). You'll be prompted to change the password on first login.

Create a new project in SonarQube:

- Go to "Projects" -> "Create a local project".
- Create a project with the name "NYT Most Popular", and key "nyt-most-popular".
- In the "Analyze your project" step, select "main" branch.
- Use the "global setting" for "Choose the baseline for new code for this project".

## Generate The SonarQube Token
Go to your user account (top-right corner) -> "My Account" -> "Security" and generate a new Project Analysis Token for the project that was just created, and save it securely. This will be used to run SonarQube.

Open `/sonar-project.properties` in the project, and replace `<SONAR_TOKEN>` with the token that was generated, and save the file.

## Run SonarQube
In order to run the analysis, first generate the coverage reports:
```bash
yarn coverage
```

Then, run SonarQube with the following:

```bash
yarn sonar
```

This in-built command will generate the coverage report first automatically, and the results will be visible in the SonarQube UI at http://localhost:9000/dashboard?id=nyt-most-popular. Note that this can URL change based on any custom configurations you have made, please refer to the terminal for the final URL.
