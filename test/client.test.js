const assert = require('assert');
const mongoose = require('mongoose');
const { pick, has } = require('lodash');
const mixin = require('../src');
const OAuthClient = require('../src/client.model')(mongoose);
const api = mixin();

describe('Clients', () => {
    let clients;

    before(async () => {
        clients = await OAuthClient.create([
            { name: 'test', secret: 'asdf1234', scopes: ['read', 'write'], isActive: true },
            { name: 'foo', secret: 'bar', scopes: ['read', 'write'], isActive: false }
        ]);
    });

    describe('getClient()', () => {
        it('should return the expected object format', async () => {
            const client = await api.getClient(clients[0].id, 'asdf1234');
            const keys = ['id', 'scopes', 'isActive'];
            assert.deepEqual(pick(client, keys), pick(clients[0].toObject({ getters: true }), keys));
            assert(has(client, 'id'));
            assert(!has(client, 'secret'));
        });

        it('should throw InvalidClientError if the client is not found', async () => {
            try {
                await api.getClient('bar', 'baz');
                throw new Error('Expected exception');
            } catch (e) {
                assert.equal(e.name, 'invalid_client');
            }
        });

        it('should return false if the password does not match', async () => {
            try {
                await api.getClient(clients[0].id, 'baz');
                throw new Error('Expected exception');
            } catch (e) {
                assert.equal(e.name, 'invalid_client');
            }
        });
    });

    describe('getUserFromClient()', () => {
        it('should return the expected object format', () => {
            const client = clients[0].toObject({ getters: true });
            const user = api.getUserFromClient(client);
            assert.strictEqual(user, client.id);
        });
    });

    describe('validateScope()', () => {
        it('should return the valid scopes', () => {
            const client = clients[0].toObject({ getters: true });
            const scopes = api.validateScope({}, client, 'write read delete');
            assert.strictEqual(scopes, 'write read');
        });
    });
});
