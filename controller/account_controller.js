const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const accs = require('../model/account.js');
const { KeyObject } = require('crypto');

module.exports = {
    login: async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let newToken = jwt.sign({
            username: username,
            password: password
        }, fs.readFileSync('primary.key'));
        const filter = {
            username: username,
            password: md5(password),
        }
        console.log(md5(password));
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
    },
    changePassword: async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let newpassword = req.body.newpassword;
            const filter = {
                username: username,
                password: md5(password)
            }
            const update = {
                password: md5(newpassword)
            }
            let result = await accs.findOneAndUpdate(filter, update);
            console.log(result);
            try {
                if (result._id) {
                    let newToken = jwt.sign({
                        username: username,
                        password: md5(newpassword)
                    }, fs.readFileSync('primary.key'));
                    const filter1 = {
                        username: username,
                        password: md5(newpassword),
                    }
                    const update1 = {
                        token: newToken
                    }
                    let result = await accs.findOneAndUpdate(filter1, update1);
                    if (result != null) {
                        result.token = newToken;
                        res.status(200).json({
                            message: "Thay đổi mật khẩu thành công!",
                            data: result.token
                        });
                    } else {
                        res.status(400).json({
                            message: "Thay đổi mật khẩu thất bại!"
                        });
                    }
                }
            } catch (ex) {
                res.status(400).json({
                    message: "Thay đổi mật khẩu thất bại1!"
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
        let check = await accs.findOne({
            token: req.body.token
        });
        if (check != null && check.permission == 10) {
            let newAcc = new accs({
                username: req.body.username,
                password: md5(req.body.password),
                full_name: req.body.full_name,
                permission: req.body.permission,
                address: req.body.address,
                avatar: "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg",
                date_reg: Date.now(),
                token: "",
                nation: req.body.nation,
            });
            let filter = {
                username: req.body.username,
            }
            let check_exist = await accs.findOne(filter);
            if(check_exist != null) {
                res.status(400).json({
                    message: 'Tài khoản đã tồn tại'
                });
            }else{
                newAcc.save((err, resuft) => {  
                    if (resuft) {
                        res.status(200).json({
                            message: "Tạo tài khoản thành công!",
                            data: resuft
                        });
                    } else {
                        res.status(400).json({
                            message: "Tạo tài khoản thất bại"
                        });
                    }
                });
            }
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
                permission: 1
            }
            if (nation == "US" || nation == "JP" || nation == "GER") {
                let result = await accs.find(filter);
                res.status(200).json({
                    message: "Lấy danh sách thành viên thành công!",
                    data: result
                });
            } else {
                let result = await accs.find();
                res.status(200).json({
                    message: "Lấy danh sách thành viên thành công!",
                    data: result
                });
            }
        } else {
            res.status(400).json({
                message: "Không có quyền thực thi!"
            });
        }
    },
    checktoken: async (req, res) => {
        let token = req.body.token;
        let check = await accs.findOne({
            token: token
        });
        try {
            if (check.permission == 10 || check.permission == 1) {
                res.status(200).json({
                    message: "token sống!"
                });
            } else {
                res.status(400).json({
                    message: "token không tồn tại!"
                });
            }
        } catch (ex) {
            res.status(400).json({
                message: "token không tồn tại!"
            });
        }
    },
}
    