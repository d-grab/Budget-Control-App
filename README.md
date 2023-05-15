<h2 align="center"> Budget-Control-Application </h2>

<p align="center">
  <img src="https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_707/v1684152514/Budget-Control-App/2_xwicqv.png" />
</p>

# Table of Contents

1.  [Project description](#project-description)
2.  [Live Link](#live-link)
3.  [Project Setup](#project-setup)
    * [First Step](#first-step)<br>
    * [Second Step](#second-step)<br>
    * [Third Step](#third-step)
4. [Firebase Setup](#firebase-setup)
5. [Development Mode (Localhost)](#development-mode-localhost)
6. [Production Mode (Deployment)](#production-mode-deployment)
    * [Firebase Hosting](#firebase-hosting)
    * [Production Build](#production-build)
8. [Used Technologies](#used-technologies)


# Project Description

The application supports users in effectively managing and controlling their expenses. 
Users have the ability to classify their expenditures and view a breakdown of where their money is going based on categories.
The users are able to :
- Add a incomes and spendings
- Create categories for expenses (e.g. "Shopping", "Travel")
- Create plans and goals (e.g. "London Tour", "New Car purchase")
- Present the financial transactions in the form of graphs, and determine which of the categories they spend the most money on.

# Live Link

Deployed application :<br> 
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
![Step2](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_298/v1683911373/Budget-Control-App/4_kosnev.png)

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

![.envFile](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_193/v1683911748/Budget-Control-App/5_raex8j.png)

# Firebase Setup

After successfully created account in Firebase platform we need to create [Firebase](https://console.firebase.google.com) project and follow simple
3 steps process.

![New Firebase Project](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_317,q_100/v1683916502/Budget-Control-App/6_ns47ac.png)<br>

- Next step is to register a Web application on Firebase. The Firebase configuration will be used in .env.dev file in our project.

![New Firebase Project](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_345,q_100/v1683921013/Budget-Control-App/13_wshcay.png)

- Secondly We need to create a databse in our web application and enable email/password Authentication to register new users.

![New Database ](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_291,q_100/v1683921230/Budget-Control-App/14_sx5tve.png)<br>

- The project can be create in production mode as everything has been tested. We need to change the rules of our databse that will Allow read/write access on all documents to any user signed in to the application

![New Database ](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,q_100,w_933/v1683921433/Budget-Control-App/15_pqjq4f.png)<br>

- Enabling Email / Password Authentication

![Email/Password Authentication](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_388,q_100/v1684154661/Budget-Control-App/16_xgi1dh.png)

- Changing database rules

```javascript
// Allow read/write access on all documents to any user signed in to the application
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null; }}}
```
![Database Rules](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_322,q_100/v1684161138/Budget-Control-App/20_t7q5gc.png)


# Development mode (Localhost)

The React application is hosted on a development server that is located on the user's local machine. This server offers various functionalities, including hot-reloading, which enables the user to view modifications in real time without requiring a browser refresh.

After downloading project and installing all dependecies, and creatig .env.dev file with Firebase configuration, the project can be started with build in script 

```javascript
npm run start
```
![Development mode](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_264,q_100/v1684159680/Budget-Control-App/17_mngaja.png)

After creating the first account and logging into the application, firebase will ask for permission to install collection indexes. Right-clicking and inspecting the page in the browser is required to access the link and install all indexes for three collections directly from Cloud Firestore.

![Cloud Indexes](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_385,q_100/v1684163620/Budget-Control-App/18_ssynqc.png)
![Cloud Indexes](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_470,q_100/v1684165292/Budget-Control-App/22_mcyjus.png)

# Production mode (Deployment)
## Firebase Hosting

For deployment of an application on Firebase platform, user is required to add hosting for the application

![Firebase Hosting](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_224,q_100/v1684166769/Budget-Control-App/24_q9hs8r.png)

Follow initialization of Hosting for an application

![Firebase Hosting](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_255,q_100/v1684167664/Budget-Control-App/29_cvxqkc.png)<br>
![Firebase Hosting](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_402,q_100/v1684167775/Budget-Control-App/28_fg55uh.png)



## Production build
In order to deploy an application on Firebase server, it is required to create a build for production. That can be achieved by running created script in which it is mandatory to change the project ID of the application into the one created on Firebase platform: 

```
"build:deploy": "env-cmd -f .env.dev npm run build && firebase deploy -P [Project Id]"  },
```
In the terminal use the command :
```
npm run build:deploy
```
![Cloud Indexes](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_147,q_100/v1684166096/Budget-Control-App/23_hw9c4t.png)

Another way of deploying an application is to used a build in script ``` npm run build ``` which will create a build file and while using the firebase-tools, perform deployment from the console level using ```firebase init``` and ```firebase deploy```<br>

After deployment the application can be access under 2 domains :<br>
[Web app address - budget-control-85f93.web.app](https://budget-control-85f93.web.app)<br>
[Firebase App address - budget-control-85f93.firebaseapp.com](https://budget-control-85f93.firebaseapp.com)

# Used Technologies

The following technologies have been used in the building process of the application:

- React   (v17.0.2 )
- Firebase  (v9.18.0)
- Node JS  (v16.14.2)
- HTML
- CSS
- Bootstrap 
- React-Tostify 
- Chart.js

React Tostify has been used to create and style pop-up messages and notification for the application. Chart.JS library has been used to create graphs and display transactions  and expenditures over time.


