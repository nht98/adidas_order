const admin = require('firebase-admin');
const serviceAccount = require("../key.json");
const Notification = require('../model/notification');
const Token_Noti = require('../model/token_noti');
const Account = require('../model/account');

module.exports = {
    add_notification: async (req, res) => {
        try {
            let token = req.body.token;
            let content = req.body.content;
            let id_account = req.body.id_account;
            let check = await Account.findOne({
                token: token
            });
            if (check.permission == 10) {
                let notification = Notification({
                    content: content,
                    id_account: id_account,
                    date_created: Date.now(),
                });
                let add_notification = await notification.save();
                if (add_notification != null) {
                    let find_token = await Token_Noti.findOne({
                        id_account: id_account
                    });
                    if (id_account != null) {
                        if (find_token.token != '') {
                            let regtoken = find_token.token;
                            let payload = {
                                notification: {
                                    body: content,
                                    title: content
                                },
                                data: {                                                                                                                                                                                                                                         
                                    message: content
                                }
                            };
                            let options = {
                                priority: "high",
                                timeToLive: 60 * 60 * 24
                            };
                            admin.initializeApp({
                                credential: admin.credential.cert(serviceAccount)
                            });
                            admin.messaging().sendToDevice(regtoken, payload, options).then(function () {
                                console.log("Successfuly send message: ", content);
                            }).catch(function (err) {
                                console.log(err);
                            });
                            res.status(200).json({
                                message: 'Thêm thông báo thành công'
                            });
                        } else {
                            // res.status(200).json({
                            //     message: 'Thêm thông báo thành công'
                            // });
                        }
                    } else {
                       let find_notification = await Token_Noti.find();
                       admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount)
                      });
                      if(find_notification.length > 0) {
                          for(let i = 0; i < find_notification.length; i++){
                            let regtoken = find_notification[i].token;
                            let payload = {
                                notification: {
                                    body: content,
                                    title: content
                                }, 
                                data: {
                                    message: content
                                }
                            };
                            let options = {
                                priority: "high",
                                timeToLive: 60 * 60 * 24
                            };
                            admin.messaging().sendToDevice(regtoken, payload, options).then(function () {
                                console.log("Successfuly send message: ", content);
                            }).catch(function (err) {
                                console.log(err);
                            });
                          }
                          if(find_notification.length - 1 == i ){
                            res.json({
                                status: "success",
                                message: "Thêm thông báo thành công"
                            });
                        }
                      }else{
                        res.json({
                            status: "success",
                            message: "Thêm thông báo thành công"
                        });
                      }

                    }
                } else {
                    res.status(400).json({
                        message: 'Thêm thông báo thất bại'
                    });
                }
            }else{
                res.status(400).json({
                    message: 'Không có quyền thực thi!'
                });
            }
        } catch (err) {
            res.status(400).json({
                message: 'Lỗi hệ thống'
            });
        }
    },

    add_token_notification: async function (req, res) {
        try {
            let token = req.body.token;
            let token2 = req.body.token2;
            let check = await Account.findOne({
                token: token
            });
            if (check.permission == 10) {
                let token_noti = Token_Noti({
                    token: token2,
                    id_account: check._id,
                    date_created: Date.now(),
                });
                let check_account = await Token_Noti.findOne({
                    id_account: check._id
                });
                if (check_account != null) {
                    let add_token = await Token_Noti.findOneAndUpdate({
                        id_account: check._id
                    }, {
                        token: ""
                    }, {
                        new: true
                    });
                    if (add_token != null) {
                        res.status(200).json({
                            message: 'Thêm token thành công'
                        });
                    } else {
                        res.status(400).json({
                            message: 'Thêm token thất bại'
                        });
                    }
                } else {
                    let add_token = await token_noti.save();
                    if (add_token != null) {
                        res.status(200).json({
                            message: 'Thêm token thành công'
                        });
                    } else {
                        res.status(400).json({
                            message: 'Thêm token thất bại'
                        });
                    }
                }

            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } catch (e) {
            res.status(400).json({
                message: "Lỗi hệ thống"
            })
        }

    }
}