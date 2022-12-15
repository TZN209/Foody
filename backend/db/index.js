const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost:27017/Foody', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(() => console.log('cơ sở dữ liệu đã được kết nối'))
    .catch((err) => console.log(err));
