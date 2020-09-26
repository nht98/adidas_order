const mongoose = require("mongoose")

const childorderSchema = new mongoose.Schema({
    idOrders_mother: mongoose.Types.ObjectId,
    order_quantity : Number,
    trackDas: String,
    trackFedex: String,
    idOrder: String,
    email: String
})
module.exports = mongoose.model("child_order", childorderSchema)