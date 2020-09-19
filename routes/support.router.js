module.exports = function(app){
    var ctrSupport = require('../controller/order_support.js');
    app.route('/api/getinfojp').post(ctrSupport.getinfojp);
    app.route('/api/getinfous').post(ctrSupport.getinfous);
}