# [Live Demo (Click Here)](https://ecstatic-pasteur-46da55.netlify.app/)

## Basic Social Media App
### This social media application was developed using MERNG stack (MongoDB, Express, React, Node, GraphQL)

## Instructions to run locally:
### 1. Create a config.js file in root directory with the following snippet:
```javascript
module.exports = {
    MONGODB: '<MONGODBSERVER>',
    SECRET_KEY: '<WHATEVERKEY>'
};
```
### 2. Replace MONGODBSERVER with the URL to your Mongo Database and WHATEVERKEY with your secret key
### 3. Run `npm start` in root directory and it will initiate your Node server at http://localhost:5000/
### 4. Run `npm start` in client directory and it will start your react app at http://localhost:3000/
