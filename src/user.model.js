const { Schema } = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const OAuthUserSchema = new Schema({
    username: { type: String, unique: 1 },
    password: { type: String },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
    toObject: {
        getters: true,
        transform: function(doc, ret) {
            delete ret._id;
            delete ret.password;
            return ret;
        }
    }
});

OAuthUserSchema.plugin(mongooseBcrypt, {
    fields: ['password'],
    rounds: 12
});

OAuthUserSchema.query.active = function() {
    return this.where({ isActive: true });
};

OAuthUserSchema.query.byUsername = function(username) {
    return this.where({ username });
};

OAuthUserSchema.index({ isActive: 1, username: 1 });

module.exports = (db) => db.model('OAuthUser', OAuthUserSchema);
