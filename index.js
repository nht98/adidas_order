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
const fileupload = require('express-fileupload');
const db = require('./configs/connect.database')
dotenv.config();
// const chilkat = require('@chilkat/ck-node12-linux64');
const host = "0.0.0.0";
const port = process.env.PORT;
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
  }));
//SERVER USE
// function chilkatExample() {
//     var glob = new chilkat.Global();
//     var success = glob.UnlockBundle("Apolou.CBX1020_T6hA3h6njUoe");
//     if (success !== true) {
//         console.log(glob.LastErrorText);
//         return;
//     }

//     var status = glob.UnlockStatus;
//     if (status == 2) {
//         console.log("Unlocked using purchased unlock code.");
//     } else {
//         console.log("Unlocked in trial mode.");
//     }

//     // The LastErrorText can be examined in the success case to see if it was unlocked in
//     // trial more, or with a purchased unlock code.
//     console.log(glob.LastErrorText);

// }

// chilkatExample();

app.use(bodyParser.urlencoded({
    extended: false
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