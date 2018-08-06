# oauth2-server-mongoose

[![Build Status](https://travis-ci.org/compwright/oauth2-server-mongoose.svg?branch=master)](https://travis-ci.org/compwright/oauth2-server-mongoose)

MongoDB/Mongoose storage backend for [oauth2-server](https://github.com/compwright/node-oauth2-server)

## Features

* Stores the following in MongoDB:
    * Clients
    * Users
* Bundled Mongoose models encrypt client secrets and user passwords using `bcrypt`

## Requirements

* Node.js 8+
* [oauth2-server](https://github.com/compwright/node-oauth2-server)
* [mongoose](http://mongoosejs.com)
* [mongoose-bcrypt](https://www.npmjs.com/package/mongoose-bcrypt) plugin

## Installation

```bash
$ npm install --save @compwright/oauth2-server oauth2-server-mongoose mongoose mongoose-bcrypt
```

## Usage

```javascript
const OAuth2Server = require('@compwright/oauth2-server');
const mongooseStore = require('oauth2-server-mongoose');

const oauth = new OAuth2Server({
    model: {
        ...mongooseStore({
            // Optional - you can specify your own models for clients and users:
            // ClientModel: mongoose.model('OAuthClient'),
            // UserModel: mongoose.model('OAuthUser')
        })
    }
});
```

See [client.model.js](src/client.model.js) and [user.model.js](src/user.model.js) for the default model configuration.

> Note: if you do supply your own models, be sure to maintain the same plugins, static methods and query helpers.

## License

MIT license
