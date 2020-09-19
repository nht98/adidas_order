module.exports = function(app){
    var ctrSupport = require('../controller/order_support.js');
    app.route('/api/getinfo').post(ctrSupport.getinfo);
}