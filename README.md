# Listing People Api
This is a backend example using [Spiel Server](https://github.com/spieljs/spiel-server).

## Requirements

* MongoDB
* Node

## Download

`git clone https://github.com/spiel-examples`

## Install

Enter to the folder and execute:

```
npm install
```

## Settings

Create database in mongo with the name ***listingPeople***, create an user asigned to it and a collection ***people***.

Create a script file ***run.sh*** in root path of the project:

```
export SERVICE_PORT=8000
export MONGO_USER=your_user
export MONGO_PASSWORD=your_password
export MONGO_HOST=localhost
export MONGO_DATABASE=listingPeople

node_modules/nodemon/bin/nodemon.js --watch 'app/**/**' -e ts --exec 'ts-node' ./app/index.ts
```

## RUN

`npm run watch`

## RUN INTEGRATIONS TEST

With the project runing:

`npm test`