const express = require('express');
const app = express();

app.use('/v1/users', require('./users'));
app.use('/v1/posts', require('./posts'));
app.use('/v1/comments', require('./comments'));
app.use('/v1/albums', require('./albums'));
app.use('/v1/photos', require('./photos'));
app.use('/v1/todos', require('./todos'));

module.exports = app;