const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://myuser:NguyenHoangThang@45.76.153.75:27017/adidas_order?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log('connected to mongo');
    }catch(e){
        console.log('failed to connect');
    }
}
module.exports = {connect}