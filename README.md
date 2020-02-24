# gazelle-analyser-api

## Requirements

- Install [Node 12](https://nodejs.org/en/download/). Version currently installed: **12.16.1 LTS**

## Configuring local DEV environment

- Install dependencies

        npm install

- Create a new file in the root folder of the project with name '.env'. [Reference](https://dev.to/numtostr/environment-variables-in-node-js-the-right-way-15ad)

        # LOCAL FRONTEND
        FE_URL='http://localhost'
        # LOCAL DATABASE
        DB_URI='mongodb://localhost/gazelledblocal?authSource=admin'
        # APPLICATION PORT
        PORT=4202
    
- Create the database 'gazelledblocal' in your local installation of MongoDB.

- Run the application

        npm start
