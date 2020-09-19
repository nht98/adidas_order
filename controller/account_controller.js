const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const accs = require('../model/account.js');

module.exports = {
    login: async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            let newToken = jwt.sign({
                username: username,
                password: password
            }, fs.readFileSync('primary.key'));
            const filter = {
                username: username,
                password: md5(password),
            }
            const update = {
                token: newToken
            }
            console.log(newToken);
            let result = await accs.findOneAndUpdate(filter, update);
            if (result != null) {
                result.token = newToken;
                res.status(200).json({
                    message: "Đăng nhập thành công!",
                    data: result
                });
            } else {
                res.status(400).json({
                    message: "Đăng nhập thất bại!"
                });
            }
        } else {
            res.status(400).json({
                message: "Đăng nhập thất bại!"
            });
        }
    },
    changePassword: async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let newpassword = req.body.newpassword;
        let token = req.body.token;
        if (username && password && newpassword && token) {
            const filter = {
                username: username,
                password: md5(password),
                token: token
            }
            const update = {
                password: md5(newpassword)
            }
            let result = await accs.findOneAndUpdate(filter, update);
            console.log(result);
            if (result != null) {
                res.status(200).json({
                    message: "Thay đổi mật khẩu thành công!"
                });
            } else {
                res.status(400).json({
                    message: "Thay đổi mật khẩu thất bại!"
                });
            }
        } else {
            res.status(400).json({
                message: "Thay đổi mật khẩu thất bại!"
            });
        }
    },
    logout: async (req, res) => {
        let token = req.body.token;
        if (token) {
            const filter = {
                token: token
            }
            const update = {
                token: ""
            }
            let result = await accs.findOneAndUpdate(filter, update);
            if (result != null) {
                res.status(200).json({
                    message: "Đăng xuất thành công!"
                });
            } else {
                res.status(400).json({
                    message: "Đăng xuất thất bại!"
                });
            }
        } else {
            res.status(400).json({
                message: "Đăng xuất thất bại!"
            });
        }
    },
    reg: async (req, res) => {
        let token = req.body.token;
        let username = req.body.username;
        let password = md5(req.body.password);
        let full_name = req.body.full_name;
        let permission = req.body.permission;
        let address = req.body.address;
        let avatar = "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg";
        let date_reg = Date.now();
        let nation = req.body.address;
        const filter = {
            token: token
        }
        let newAcc = new accs({
            username: username,
            password: password,
            full_name: full_name,
            permission: permission,
            address: address,
            avatar: avatar,
            date_reg: date_reg,
            token: "",
            nation: nation,
        });
        let check = await accs.findOne({
            token: token
        });
        console.log(check)
        if (check != null && check.permission == 10) {
            newAcc.save((err, resuft) => {
                if (resuft) {
                    res.status(200).json({
                        message: "Đặt hàng thành công!",
                        data: resuft
                    });
                } else {
                    res.status(400).json({
                        message: "Đặt hàng thất bại"
                    });
                }
            });
        } else {
            res.status(400).json({
                message: "Không có quyền thực thi!"
            });
        }
    },
    getaccbynation: async (req, res) => {
        let token = req.body.token;
        let nation = req.body.nation;
        let check = await accs.findOne({
            token: token
        });
        if (check != null && check.permission == 10) {
            const filter = {
                nation: nation,
            }
            if (nation == "US" || nation == "JP") {
                let result = await accs.find(filter);
                res.status(200).json({
                    message: "Lấy danh sách đơn hàng thành công!",
                    data: result
                });
            }else {
                let result = await accs.find();
                res.status(200).json({
                    message: "Lấy danh sách đơn hàng thành công!",
                    data: result
                });
            }
        } else {
            res.status(400).json({
                message: "Không có quyền thực thi!"
            });
        }
    },
}