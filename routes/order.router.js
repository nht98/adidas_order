module.exports = function(app){
    var ctrOrder = require('../controller/order_controller');
    var middleware = require('../middleware/order.middleware');
    app.route('/api/bookorder').post(middleware.bookorder, ctrOrder.bookorder);
    app.route('/api/editorder').post(ctrOrder.editorder);
    app.route('/api/cancelorder').post(ctrOrder.cancelorder);
    app.route('/api/getorderbyaccount').post(ctrOrder.getorderbyaccount);
    app.route('/api/getorderbystatus').post(ctrOrder.getorderbystatus);
    app.route('/api/donepay').post(ctrOrder.donepay);
    app.route('/api/deleteorder').post(ctrOrder.deleteorder);
    app.route('/api/childorder').post(middleware.childorder,ctrOrder.childorder);
    app.route('/api/getbyidorder').post(ctrOrder.getbyidorder);
    app.route('/api/receiveorder').post(ctrOrder.receive_order);
    app.route('/api/getorderpublic').post(ctrOrder.getorderpublic);
}