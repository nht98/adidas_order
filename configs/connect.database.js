const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
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