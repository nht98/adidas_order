const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require("mongoose")
const fs = require('fs')
const db = require('./configs/connect.database')
dotenv.config();

const host = "0.0.0.0";
const port = process.env.PORT || 5555;
//SERVER USE
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(helmet());
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
})
// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}))
app.use(cors());
//SERVER SET
app.set("view engine", "ejs");
app.set("views", './views');
app.use(express.static('public'));

//connect MongoDB

db.connect()
// Setup RE
let rouAccount = require('./routes/account.router');
rouAccount(app);

let rouOrder = require('./routes/order.router');
rouOrder(app);

let rouSupport = require('./routes/support.router');
rouSupport(app);

app.get('*', function (req, res) {
    // res.status(404).json({
    //     message: "Trang không tồn tại, vui lòng thử lại"
    // });
    res.render("login")
})
app.post('*', function (req, res) {
    res.status(404).json({
        message: "Trang không tồn tại, vui lòng thử lại"
    });
})
if (!module.parent) {
    app.listen(port, host, () => {
        console.log("Server running - port" + port);
    });
}

module.exports = app