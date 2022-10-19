const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse request content type
app.use(bodyParser.json());

// parse request content application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// for db
const db = require('./model');
// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log('Drop and Resync Db');
// });

// for route
app.get('/', (req, res) => {
    res.json({ message: "Connected!" });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// for port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}!`);
});