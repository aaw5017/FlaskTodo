# Flask + Svelte ToDo Application

## Preface

This application was written on a Windows machine. It utilizes a bat file in order to set Flask environment variables and start the Flask server.

This application assumes Python 3 (3.7.4 at time of writing). Pipenv is used as the virtual envionment -- please visit [their Github page](https://github.com/pypa/pipenv#pipenv-python-development-workflow-for-humans) for more information.


## Getting Started

#### Create SQLite Tables

Inside the pipenv shell, start a Python command line. Run the `create-db.py` script.

#### Install NPM Modules

Inside the **frontend_src** folder, run `npm install`.

## Start the Flask Server

In the pipenv shell, execute the `server-start.bat` file. This will spin up a Flask server in development mode.

## Start the Webpack Dev Server

This application utilizes HMR, and as such uses a webpack development server to proxy requests to the Flask server.

Navigate to the **frontend_src** folder and run the `npm run dev` command. This will start the Webpack dev server and should listen on a port that's different from your Flask server port. The terminal should display the port in which it's listening. In my case, it was **localhost:8080**.

## Using the App
Navigate to your Webpack dev server address and you should be all set. Your front end source files should be hot-reloaded onto the page, and all api requests should be proxied to the Flask backend. Data should be persisted inside the local SQLite database you created above.