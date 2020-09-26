module.exports = function(app){
    var ctrAccount = require('../controller/account_controller');
    var middleware = require('../middleware/user.middleware');
    app.route('/api/login').post(middleware.login, ctrAccount.login);
    app.route('/api/change-password').post(middleware.changePassword, ctrAccount.changePassword);
    app.route('/api/logout').post(ctrAccount.logout);
    app.route('/api/reg').post(ctrAccount.reg);
    app.route('/api/getaccbynation').post(ctrAccount.getaccbynation);
    app.route('/api/checktoken').post(ctrAccount.checktoken);
}