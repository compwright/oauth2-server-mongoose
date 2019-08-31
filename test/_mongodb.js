const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

before(done => {
    mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, err => {
        if (err) return done(err);
        mongoose.connection.db.dropDatabase(done);
    });
});

after(() => mongoose.connection.close());
