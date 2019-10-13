const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.json()); // SE REQUIERE BODY-PARSER PARA USAR ÉSTE MIDDLEWARE
app.use(routes);

app.get('/', (req, res) => {
    res.send("Hello world");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});