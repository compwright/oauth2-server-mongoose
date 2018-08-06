const assert = require('assert');
const mongoose = require('mongoose');
const { pick, has } = require('lodash');
const mixin = require('../src');
const OAuthUser = require('../src/user.model')(mongoose);
const api = mixin();

const users = [
    { username: 'test', password: 'asdf1234', isActive: true },
    { username: 'foo', password: 'bar', isActive: false }
];

describe('Users', () => {
    before(() => OAuthUser.create(users));

    describe('getUser()', () => {
        it('should return the expected object format', async () => {
            const user = await api.getUser(users[0].username, users[0].password);
            const keys = ['username', 'isActive'];
            assert.deepEqual(pick(user, keys), pick(users[0], keys));
            assert(has(user, 'id'));
            assert(!has(user, 'password'));
        });

        it('should return false if the user is not found', async () => {
            const user = await api.getUser('bar', 'baz');
            assert.strictEqual(user, false);
        });

        it('should return false if the password does not match', async () => {
            const user = await api.getUser('test', 'foobarbaz');
            assert.strictEqual(user, false);
        });
    });
});
