const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
	username: String,
    password: String,
    full_name: String,
    permission: Number,
    address: String,
    avatar: String,
    date_reg: Date,
    token: String,
    nation: String
})

module.exports = mongoose.model("account", accountSchema)