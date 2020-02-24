# react-todo-app - server

## Available Scripts

In the project directory, you can run:

### `npm start` or `node server.js`

To start up the server

### `npm install`

To install dependencies in package.json

## Table creation

If you have a databased in MySQL named "true" when the server is started two tables named "todos" and "messages" will be created for you. This is done in lines 18-24 in the [Model index](models/index.js)

## Dependencies

```
 "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "express": "^4.16.4",
    "http-errors": "~1.6.3",
    "morgan": "^1.9.1",
    "mysql": "^2.17.1",
    "mysql2": "^2.1.0",
    "sequelize": "^5.21.4"
  }
  
  ```
  
  
  ## Config.json Setup
  
You will need a config.json file with the following config. You will need MySQL and create database named "true" but of course the config property values can be updated to any mysql database, credentials and port number.:
 
 ```
  
  {
    "currentProfile": "development",
    "development": {
        "config_id": "development",
        "app_name": "server",
        "app_desc": "server application",
        "node_port": 2700,
        "json_indentation": 4,
        "database": {
            "name": "true",
            "host": "localhost",
            "user": "root",
            "password": "root",
            "port": "3306",
            "dialect": "mysql"
        }
    }
}

```
