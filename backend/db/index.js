const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost:27017/Foody', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(() => console.log('out db is connected'))
    .catch((err) => console.log(err));
