module.exports = function(app){
    var ctrSupport = require('../controller/order_support.js');
    app.route('/api/getinfojp').post(ctrSupport.getinfo_jp);
    app.route('/api/getinfousa').post(ctrSupport.getinfo_usa);
    app.route('/api/getinfoger').post(ctrSupport.getinfo_ger);
}