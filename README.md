# Thesis React application

This project was created in spring 2022. The purpose is to connect to
three different serverless backend API:s and test their functionality. Would they
be suitable for running a smaller serverless application?

This is a variation of the React application which connects to the AWS Cognito User Pool.
This is done to register and login users with the aid of
the npm packages *aws-sdk* and *amazon-cognito-identity-js*,
and not through fetch-requests as the other project.

## Available Links

Basic web page with login functionality.
Available routes are:
- Home, test, register, login, auth and about.
    - Login: sign in a user
    - Test: test route with a simple fetch to a get-route on the cloud provider
    - Auth: test route which requires are valid token in order to access
    - Register: register a new user
    - About: short info about the webpage

The file *src/vars.js* needs to be created and contain the following variables: *baseUrl*, *homepage* (http://localhost:3000 if run locally), *userPoolid* and *clientid*.

The *baseUrl* is the base URL of the deployed backend on AWS. It is used
to contact the /test and /auth
routes in order to fill up information in certain sub-pages of the React webpage.

Fill in id in the variables *userPoolid* and *clientid* (in src/vars.js) from the Cognito User Pool and Cognito User Pool Client.

## How to use the app
- You need to have an API running with its base URL (fill it in according to above).
- The API could be found in one my serverless-aws-cognito repository
- Run **npm start** to run the application locally (localhost:3000)
- The mentioned routes above will automatically be connected to the application
