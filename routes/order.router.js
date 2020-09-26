module.exports = function(app){
    var ctrOrder = require('../controller/order_controller');
    app.route('/api/bookorder').post(ctrOrder.bookorder);
    app.route('/api/editorder').post(ctrOrder.editorder);
    app.route('/api/cancelorder').post(ctrOrder.cancelorder);
    app.route('/api/getorderbyid').post(ctrOrder.getorderbyid);
    app.route('/api/getorderbystatus').post(ctrOrder.getorderbystatus);
    app.route('/api/updateorder').post(ctrOrder.updateorder);
    app.route('/api/donepay').post(ctrOrder.donepay);
    app.route('/api/deleteorder').post(ctrOrder.deleteorder);
    app.route('/api/childorder').post(ctrOrder.childorder);
}