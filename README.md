# oauth2-server-mongoose

[![Build Status](https://travis-ci.org/compwright/oauth2-server-mongoose.svg?branch=master)](https://travis-ci.org/compwright/oauth2-server-mongoose)
[![Dependency Status](https://img.shields.io/david/compwright/oauth2-server-mongoose.svg?style=flat-square)](https://david-dm.org/compwright/oauth2-server-mongoose)
[![Download Status](https://img.shields.io/npm/dm/oauth2-server-mongoose.svg?style=flat-square)](https://www.npmjs.com/package/oauth2-server-mongoose)
[![Sponsor on GitHub](https://img.shields.io/static/v1?label=Sponsor&message=❤&logo=GitHub&link=https://github.com/sponsors/compwright)](https://github.com/sponsors/compwright)

MongoDB/Mongoose storage backend for [oauth2-server](https://github.com/compwright/node-oauth2-server)

## Features

* Stores the following in MongoDB:
    * Clients
    * Users
* Bundled Mongoose models encrypt client secrets and user passwords using `bcrypt`

## Requirements

* Node.js 10+
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

## Bundled Scripts

### oauth2-create-client [dburl]

Interactive script to add a client to the `oauthclients` database collection.

Generates and encrypts the client secret automatically.

### oauth2-create-user [dburl]

Interactive script to add a user to the `oauthusers` database collection.

Encrypts the user password automatically.

## License

MIT license
