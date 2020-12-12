const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    id_account: mongoose.Types.ObjectId,
    content: String,
    date_created: Date,
})

module.exports = mongoose.model("notification", notificationSchema)