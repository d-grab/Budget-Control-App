<h2 align="center"> Budget-Control-Application </h2>

<p align="center">
  <img src="https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_707/v1684152514/Budget-Control-App/2_xwicqv.png" />
</p>

# Table of Contents

1.  [Project description](#project-description)
2.  [Project Setup](#project-setup)
    * [First Step](#first-step)<br>
    * [Second Step](#second-step)<br>
    * [Third Step](#third-step)
3. [Firebase Setup](#firebase-setup)
4. [Production Mode](#production-mode)
5. [Development Mode](#development-mode)
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
![Email/Password Authentication](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,e_sharpen:100,h_388,q_100/v1684154661/Budget-Control-App/16_xgi1dh.png)


