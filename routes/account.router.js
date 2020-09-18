module.exports = function(app){
    var ctrAccount = require('../controller/account_controller');
    app.route('/api/login').post(ctrAccount.login);
    app.route('/api/change-password').post(ctrAccount.changePassword);
    app.route('/api/logout').post(ctrAccount.logout);
    app.route('/api/reg').post(ctrAccount.reg);
}