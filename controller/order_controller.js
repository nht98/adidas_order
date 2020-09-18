const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const Order = require('../model/order.js');
const Account = require('../model/account.js');
module.exports = {
    // 0 : chờ khách check đơn
    // 1 : đã check đơn
    // 2 : đã được vận chuyển
    // 3 : đã nhận
    // 4 : huỷ đơn
    bookorder: async (req, res) => {
        let size = 0;
        let colorProduct = "";
        let linkOrder = req.body.linkOrder;
        size = req.body.size;
        let quantity = req.body.quantity;
        let address_ship = req.body.address_ship;
        let image = req.body.image;
        let data_order = Date.now();
        let nation = req.body.nation;
        let idShiper = req.body.idShiper;
        let nameProduct = req.body.nameProduct;
        let token = req.body.token;
        let price = req.body.price;
        let status = 0;
        colorProduct = req.body.colorProduct;
        let trackDas = "";
        let trackFedex = "";
        if (linkOrder && quantity && address_ship && image && nation && idShiper && nameProduct && price && token) {
            const order = new Order({
                linkOrder: linkOrder,
                size: size,
                quantity: quantity,
                address_ship: address_ship,
                image: image,
                data_order: data_order,
                nation: nation,
                idShiper: idShiper,
                nameProduct: nameProduct,
                price: price,
                status: status,
                trackDas: trackDas,
                trackFedex: trackFedex,
            });
            let check = await Account.findOne({
                token: token
            });
            console.log(check)
            if (check.permission == 10) {
                order.save((err, resuft) => {
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

        } else {
            res.status(400).json({
                message: "Đặt hàng thất bại"
            });
        }
    },
    editorder: async (req, res) => {
        let update = req.body;
        let token = req.body.token;
        let _id = req.body._id;
        const filter = {
            _id: _id
        }
        let check = await Account.findOne({
            token: token
        });
        try{
            if (check.permission == 10) {
                let result = await Order.findOneAndUpdate(filter, req.body);
                console.log(result);
                if (result != null) {
                    res.status(200).json({
                        message: "Thay đổi mật khẩu thành công!"
                    });
                } else {
                    res.status(400).json({
                        message: "Chỉnh sửa đơn hàng thất bại!"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        }catch(ex){
            res.status(400).json({
                message: "Không có quyền thực thi!"
            });
        }

    },
    cancelorder: async (req, res) => {
        let token = req.body.token;
        let _id = req.body._id;
        const filter = {
            _id: _id
        }
        if (token) {
            let check = await Account.findOne({
                token: token
            });
            if (check.permission == 10) {
                let result = await Order.findOneAndUpdate(filter, {
                    status: 4
                });
                if (result != null) {
                    res.status(200).json({
                        message: "Huỷ đơn thành công!"
                    });
                } else {
                    res.status(400).json({
                        message: "Huỷ đơn thất bại!"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } else {
            res.status(400).json({
                message: "Không có quyền thực thi!"
            });
        }
    },
    getorderbyid: async (req, res) => {
        let token = req.body.token;
        let _id = req.body._id;
        
        if (token) {
            let check = await Account.findOne({
                token: token
            });
            if (check.permission == 10) {
                const filter = {
                    _id: _id,
                }
                let result = await Order.find(filter);
                res.status(200).json({
                    message: "Lấy danh sách đơn hàng thành công!",
                    data: result
                });
            } else {
                const filter = {
                    _id: _id,
                    idShiper: check._id
                }
                let result = await Order.find(filter);
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
    getorderbystatus: async (req, res) => {
        let token = req.body.token;
        let status = req.body.status;
        
        if (token) {
            let check = await Account.findOne({
                token: token
            });
            if (check.permission == 10) {
                const filter = {
                    status: status,
                }
                let result = await Order.find(filter);
                res.status(200).json({
                    message: "Lấy danh sách đơn hàng thành công!",
                    data: result
                });
            } else {
                const filter = {
                    status: status,
                    idShiper: check._id
                }
                let result = await Order.find(filter);
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
    updateorder: async (req, res) => {
        let idOrder = req.body.idOrder;
        let email = req.body.email;
        let trackDas = req.body.trackDas;
        let trackFedex = req.body.trackFedex;
        let token = req.body.token;
        let _id = req.body._id;
        
        let check = await Account.findOne({
            token: token
        });
        try{
            if (check != null &&check.permission) {
                const filter = {
                    _id: _id,
                    status: 0,
                    idShiper: check._id
                }
                let update = {
                    idOrder: idOrder,
                    email: email,
                    trackDas: trackDas,
                    trackFedex: trackFedex
                };
                let result = await Order.findOneAndUpdate(filter, update);
                console.log(result);
                if (result != null) {
                    res.status(200).json({
                        message: "Update trạng thái thành công!"
                    });
                } else {
                    res.status(400).json({
                        message: "Update trạng thái thất bại!"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        }catch(ex){
            res.status(400).json({
                message: "Không có quyền thực thi!"
            });
        }

    },
}