module.exports = function(app){
    var ctrOrder = require('../controller/order_controller');
    var middleware = require('../middleware/order.middleware');
    app.route('/api/bookorder').post(middleware.bookorder, ctrOrder.bookorder);
    app.route('/api/editorder').post(middleware.editorder ,ctrOrder.editorder);
    app.route('/api/cancelorder').post(middleware.cancelorder ,ctrOrder.cancelorder);
    app.route('/api/getorderbyaccount').post(middleware.getorderbyaccount, ctrOrder.getorderbyaccount);
    app.route('/api/getorderbystatus').post(middleware.getorderbystatus, ctrOrder.getorderbystatus);
    app.route('/api/donepay').post(middleware.donepay, ctrOrder.donepay);
    app.route('/api/deleteorder').post(ctrOrder.deleteorder);
    app.route('/api/childorder').post(middleware.childorder,ctrOrder.childorder);
    app.route('/api/getbyidorder').post(middleware.getbyidorder ,ctrOrder.getbyidorder);
    app.route('/api/receiveorder').post(middleware.receive_order ,ctrOrder.receive_order);
    app.route('/api/getorderpublic').post(middleware.getorderpublic, ctrOrder.getorderpublic);
    app.route('/api/totalreceived').post(ctrOrder.total_received);
    app.route('/api/totaldonepay').post(ctrOrder.total_donepay);
    app.route('/api/totalwage').post(ctrOrder.total_wage);
}