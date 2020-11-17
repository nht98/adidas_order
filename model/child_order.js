const mongoose = require("mongoose")

const childorderSchema = new mongoose.Schema({
    idOrders_mother: mongoose.Types.ObjectId,
    order_quantity : Number,
    trackDas: String,
    trackFedex: String,
    status: String,
    idOrder: String,
    email: String,
    data_order: Date,
})
module.exports = mongoose.model("child_order", childorderSchema)