# Dashup



 (                                   
 )\ )                )               
(()/(      )      ( /(    (          
 /(_))  ( /(  (   )\())  ))\  `  )   
(_))_   )(_)) )\ ((_)\  /((_) /(/(   
 |   \ ((_)_ ((_)| |(_)(_))( ((_)_\  
 | |) |/ _` |(_-<| ' \ | || || '_ \) 
 |___/ \__,_|/__/|_||_| \_,_|| .__/  
                             |_|     



Dashup is a personal dashboard app with your local weather and news from around the world.

### Installation

Dashup requires [Node.js](https://nodejs.org/) v10+ to run.

At root folder run the below command. This will install concurrent and allow npm start at the root level which will run both the client and the server through a proxy.

```sh
$ npm install
```

We will need to cd into backend from the root directory then install.

```sh
$ cd backend
$ npm install
```

We will need to cd into client from the root directory then install.

```sh
$ cd client
$ npm install
```

# API Keys and Env Variable Set Up:

Create a .env file at your root directory and format it like the code below.

    DARKSKY_API=...KEY...
    MONGO_DB_LINK=...MONGO_URI...
    CNN_API=...KEY...
    REACT_APP_GOOGLE_LOGIN_CLIENT_ID=...KEY...

Get your [darksky] API Key here.
Get your [News Api] API Key here.

# Google Client login and setup

Set up your [Google Login Client] here.

- Click on credentials --> Create credentials
- Select OAuth client ID --> Web application
- Add ' http://localhost:3000 ' to Authorized Javascript origins and then save.
- Copy the Client ID you just created under OAuth2 client IDs and add it to your .env file for REACT_APP_GOOGLE_LOGIN_CLIENT_ID

# DB Setup

Visit [MLab] to set up your mongoDB.

- Once your account is created, create new MongoDB Deployment.
- Select the cloud provider of your choice, sandbox plan type and click continue.
- Select a region.
- Enter a database name(must be lower case) and click continue.
- Click Submit Order(Don't worry. It is free.)
- Click on the db you just created and then select Users --> Add database user.
- Follow the prompts. Remember username and password as you will need this for your URI.
- Copy down the URI ex. mongodb://<dbuser>:<dbpassword>@ds234389.mlab.com:31589/mydb
- replace <dbuser> and dbpassword with the user info you just created
- Add the MongoDB URI to your .env file.

# Run

Once here you can cd back into your root directory.

```sh
$ npm start
```

To Run test.

```sh
$ npm test
```

This should start up your server and react client server and allow you to interact with the dashboard app.

[darksky]: https://darksky.net/dev
[node.js]: http://nodejs.org
[news api]: https://newsapi.org/
[google login client]: https://console.cloud.google.com/apis
[mlab]: https://mlab.com
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[gulp]: http://gulpjs.com
