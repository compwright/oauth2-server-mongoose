const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

before(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connection.db.dropDatabase();
});

after(() => mongoose.connection.close());
