//Server
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../client')));

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
})