const defaultsDeep = require('lodash/defaultsDeep');
const InvalidClientError = require('@compwright/oauth2-server/lib/errors/invalid-client-error');
const getClientModel = require('./client.model');
const getUserModel = require('./user.model');

module.exports = (options = {}) => {
    const mongoose = options.mongoose || require('mongoose');

    const { ClientModel, UserModel } = defaultsDeep({}, options, {
        ClientModel: getClientModel(mongoose),
        UserModel: getUserModel(mongoose)
    });

    return {
        getClient: async (clientId, clientSecret) => {
            try {
                var client = await ClientModel.findById(clientId)
                    .active()
                    .exec();
            } catch (e) {
                throw new InvalidClientError();
            }
    
            if (!client) {
                throw new InvalidClientError();
            }

            if (clientSecret && !(await client.verifySecret(clientSecret))) {
                throw new InvalidClientError();
            }

            return client.toObject({ getters: true });
        },

        getUserFromClient: ClientModel.getUserFromClient,

        validateScope: ClientModel.validateScope,

        getUser: async (username, password) => {
            try {
                var user = await UserModel.findOne()
                    .active()
                    .byUsername(username)
                    .exec();
            } catch (e) {
                return false;
            }

            if (!user) {
                return false;
            }

            if (! (await user.verifyPassword(password))) {
                return false;
            }

            return user.toObject({ getters: true });
        }
    };
};
