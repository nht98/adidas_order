module.exports = function(app){
    var ctrOrder = require('../controller/order_controller');
    app.route('/api/bookorder').post(ctrOrder.bookorder);
    app.route('/api/editorder').post(ctrOrder.editorder);
    app.route('/api/cancelorder').post(ctrOrder.cancelorder);
    app.route('/api/getorderbyaccount').post(ctrOrder.getorderbyaccount);
    app.route('/api/getorderbystatus').post(ctrOrder.getorderbystatus);
    app.route('/api/donepay').post(ctrOrder.donepay);
    app.route('/api/deleteorder').post(ctrOrder.deleteorder);
    app.route('/api/childorder').post(ctrOrder.childorder);
    app.route('/api/getbyidorder').post(ctrOrder.getbyidorder);
}