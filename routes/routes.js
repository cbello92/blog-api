const express = require('express');
const app = express();

app.use('/v1/users', require('./users'));
app.use('/v1/posts', require('./posts'));
app.use('/v1/comments', require('./comments'));

module.exports = app;