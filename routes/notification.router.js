module.exports = function(app){
    var ctrNotification = require('../controller/notification_controller');
    app.route('/api/add-notification').post(ctrNotification.add_notification);
    app.route('/api/add-token-notification').post(ctrNotification.add_token_notification);

}