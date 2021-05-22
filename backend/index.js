const express = require('express');
const cors = require('cors');

const db = require('./db');
const app = express();
const port = 5000;

let arg;
(process.argv[2]=="-to") ? arg = process.argv[2].toLowerCase() : arg = "";

db.initializeTable(arg);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(port, () => { console.log(`App running on port ${port}.`) })
app.use('/', require('./routes/Routes.js'));