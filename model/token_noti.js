const mongoose = require("mongoose")

const token_notiSchema = new mongoose.Schema({
    id_account: mongoose.Types.ObjectId,
    token: String,
    date_created: Date,
})

module.exports = mongoose.model("token_noti", token_notiSchema)