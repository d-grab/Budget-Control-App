<h2 align="center"> Budget-Control-Application </h2>

<p align="center">
  <img src="https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,q_100,w_657/v1683910489/Budget-Control-App/2_ewawda.png" />
</p>

# Table of Contents

1.  [Project description](#project-description)
2.  [Project Setup](#project-setup)
    * [First Step](#first-step)<br>
    * [Second Step](#second-step)<br>
    * [Third Step](#third-step)
3. [Firebase Setup](#firebase-setup)
7. [Security and Scalability](#securityy-and-scalability)
8. [Conlusion and Reflection](#conclusion-and-reflection)

# Project Description

The application supports users in effectively managing and controlling their expenses. 
Users have the ability to classify their expenditures and view a breakdown of where their money is going based on categories.
The users are able to :
- Add a incomes and spendings
- Create categories for expenses (e.g. "Shopping", "Travel")
- Create plans and goals (e.g. "London Tour", "New Car purchase")
- Present the financial transactions in the form of graphs, and determine which of the categories they spend the most money on.

Deployed application : 
https://budget-control-85f93.web.app <br>
https://budget-control-85f93.firebaseapp.com

# Project Setup

## First Step 

To run the project, we have to download a zip file from the GitHub repository which contain all of the web application files
![GitHubStep1](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,q_100,w_805/v1683911199/Budget-Control-App/3_sfdym2.png)

After we downloaded the project we need to unpack to any location on our disk drive. We need to install ["NodeJS"](https://nodejs.org/en/download/) on our computer
and choose a correct version.

## Second Step

In the Visual Studio Code we need to open the project containing all of the files. After loading successfully to Visual Studio we should install all dependencies that are located in package.json files .

In root of our project we need to run in terminal :
```javascript
npm install
```
![Step2](https://res.cloudinary.com/dwc3fiaro/image/upload/v1683911373/Budget-Control-App/4_kosnev.png)

## Third Step

### .ENV variables

Next step is to create .env.dev file.
.env.dev file has to be located in the root folder. It's including our firebase configuration variables.


```javascript
REACT_APP_API_KEY=[our details]
REACT_APP_AUTH_DOMAIN=[our details]
REACT_APP_PROJECT_ID=[our details]
REACT_APP_STORAGE_BUCKET=[our details]
REACT_APP_MESSAGING_SENDER_ID=[our details]
REACT_APP_APP_ID=[our details]
```

![.envFile](https://res.cloudinary.com/dwc3fiaro/image/upload/v1683911748/Budget-Control-App/5_raex8j.png)

# Firebase Setup

# Connecting with Cluster in MongoDb Compass

To establish a new connection with dabase and see all of the data and collection we have to use a link to the Collection from .env file 

``` mongodb+srv://admin:admin@cluster0.8tm77.mongodb.net/E-BookShop?retryWrites=true&w=majority ```

***where :***  <br>

username - admin <br>
password - admin

![ConnectedCompass](https://res.cloudinary.com/dwc3fiaro/image/upload/v1654528552/Report/MONGO_COMPASS_CONNECTION_idffew.jpg)

## After successfull connection we should be able to see this window 

![AfterConnection](https://res.cloudinary.com/dwc3fiaro/image/upload/v1654528640/Report/MONGO_AFTER_CONNECTED_afotg4.jpg)





# Running project in development mode

To run frontend : (running on port : 3000)
```
npm run client
```

To run backend : (running on port: 5000)
```
npm run server
```
To run backend and fronend 
```
npm run dev
```
To run backend and frontend in the same time I created script in package.json 
```javascript
"dev": "concurrently \"npm run server\" \"npm run client\"",
```

# Running project in production mode

In .env file we need to change from 
```javascript
NODE_ENV = development
```
to :
```javascript
NODE_ENV = production
```

![ProductionMmode](https://res.cloudinary.com/dwc3fiaro/image/upload/v1654529275/Report/productionMODE_fvz6i2.jpg)

We need to create build for production typing in ```/frontend```
```
npm run build
```       
![BuildProduction](https://res.cloudinary.com/dwc3fiaro/image/upload/v1654529566/Report/NPM_BUILD_xfwxqj.jpg)

After successfully running ```npm run build``` , in the root folder we can type in command  ```npm start``` <br>


Our application will run on  ``` port 5000```

![npmSTART](https://res.cloudinary.com/dwc3fiaro/image/upload/v1654529752/Report/NPM_START_vaebt4.jpg)

![RunningProduction](https://res.cloudinary.com/dwc3fiaro/image/upload/v1654529830/Report/RUNNING_PRODUCTION_hu1rcd.jpg)






## Backend modules
I use ECMAScript Modules for backed to covert common JS to import JS. for example in server.js instead of using 
```javascript
const express = require('express)
``` 
We can use 
```javascript
import express from 'express'
```

The only thing we have to remember is to add .js when we importing files, not packages .
In order to use that module I added in root folder package.json,  line

```javascript
"type": "module"
```

[ECMA Moodule](https://nodejs.org/api/esm.html), [Package Instructions](https://nodejs.org/api/packages.html)






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
