# Dashup

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
Set up your [Google Login Client] here.

# DB Setup

Visit [MLab] to set up your mongoDB.

- follow the instructions to set up a free sandbox.
- you will need to add the MongoDB URI to your .env file

# Run

Once here you can cd back into your root directory.

```sh
$ npm start
```

This should start up your server and react client server and allow you to interact with the dashboard app.

[darksky]: https://darksky.net/dev
[node.js]: http://nodejs.org
[news api]: https://newsapi.org/
[google login client]: https://developers.google.com/identity/sign-in/web/sign-in
[mlab]: https://mlab.com
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[gulp]: http://gulpjs.com
