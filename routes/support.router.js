module.exports = function(app){
    var ctrSupport = require('../controller/order_support.js');
    app.route('/sp/getinfo').post(ctrSupport.getinfo);
    app.route('/sp/editorder').post(ctrSupport.getstatus);
}