# Guide
To run this server you need to make .env file and add some variables

* **JWT_TOKEN_KEY** which will be used to generate and verify jwt tokens for user
* **PORT** where you want to host the server
* **MONGODB_URI** Mongo db uri to connect to your DB.

Finally to start the server you can use ```npx ts-node index.ts``` or create a build and the run ```node index.js``` from build folder

Client Repo Url: https://github.com/adssd08/Insta-Read-Client
