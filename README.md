# Simple Currency Converter

Welcome to the Simple Currency Converter project!

## Project Description

This simple project is a web application based on the MVC (Model-View-Controller) architecture, utilizing Node.js with Express as the framework and Handlebars as the template engine for handling views. The application also includes REST APIs that allow you to retrieve currency-related data and perform calculations based on them.

To optimize the application's performance and reduce the number of calls to external APIs, a local cache has been implemented to temporarily store currency data obtained from the APIs. This cache has been configured as a cookie with a duration of 1 day.

## Project Structure

The project is organized following an MVC (Model-View-Controller) architecture for better separation of responsibilities:

- `models/`: Contains data models or object definitions managed by the application.
- `views/`: Contains the views of the application using the Handlebars template engine.
- `controllers/`: Contains controllers that handle HTTP requests and communicate with models and views.
- `public/`: Contains static files such as CSS or JavaScript.
- `routes/`: Defines the routes and REST APIs of the application.
- `config/`: Contains configuration files.

## Requirements

- [Node.js](https://nodejs.org/)
- [Nodemon](https://nodemon.io/)
- Environment variables

## Installing Node.js

If `Node.js` is not already installed on your system, you can easily download and install it by following these steps:

1. Visit the official [Node.js](https://nodejs.org/) website.

2. Download the recommended (LTS) version for your operating system.

3. Follow the installation instructions provided by the installer.

4. Once the installation is complete, verify if Node.js has been installed correctly by running the following commands in your terminal:

    ```
    node -v
    ```

    ```
    npm -v
    ```

    Both commands should return the correct versions of Node.js and npm.

## Installing Nodemon

You can install `nodemon` globally using npm (Node Package Manager) with the following command:

```
npm install -g nodemon
```

This will install nodemon globally on your system, allowing you to use it in any Node.js project.

## Configuring Environment Variables

Before running the project, you need to create a `.env` file in the project's root directory and insert the following values:

```
PORT=[your port]
HOST=[your host]
DEFAULT_KEY=[your API key here]
```

Replace:
- `[your port]` with the port you want to use (e.g. 3000).
- `[your host]` with the host you want to use (e.g. localhost).
- `[your API key here]` with your API key obtained from [freecurrencyapi](https://freecurrencyapi.com/).

## Running the Project
Once all the requirements have been met, you can run the project with the following command:

```
npm run develop
```