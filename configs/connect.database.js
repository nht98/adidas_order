const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://myUserAdmin:NguyenHoangThang@171.244.38.52:27017/test_db?authSource=admin', {
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