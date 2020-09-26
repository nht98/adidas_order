const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const Order = require('../model/order.js');
const Account = require('../model/account.js');
const Child_order = require('../model/child_order');
const { token } = require('morgan');
module.exports = {
    // 0 : chờ khách check đơn
    // 1 : đã vận chuyển
    // 2 : đã nhận
    // 3 : huỷ đơn
    // 4 : đã thanh toán
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
        let nameShiper = req.body.nameShiper;
        let idOrder = req.body.idOrder;
        let realquantity = 0;

        let pay_price = 0;
        if (linkOrder && quantity && address_ship && image && nation && idShiper && nameProduct && price && token && nameShiper && idOrder) {
            pay_price = price * 0.6;
            const order = new Order({
                linkOrder: linkOrder,
                size: size,
                quantity: quantity,
                realquantity: quantity,
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
                pay_price: pay_price,
                nameShiper: nameShiper,
                idOrder: idOrder,
            });
            let check = await Account.findOne({
                token: token
            });
            console.log(check)
            if (check != null && check.permission == 10) {
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
                message: "Đặt hàng thất bại do thiếu trường dữ liệu"
            });
        }
    },

    childorder: async (req, res) => {
        try {
            let token = req.body.token;
            const regsc = /script|html/ig;
            let idOrder = req.body.idOrder;
            idOrder = idOrder.replace(/[^\w\s]/gi, "");
            idOrder = idOrder.replace(regsc, "");

            let idOrders_mother = req.body.idOrders_mother;
            idOrders_mother = idOrders_mother.replace(/[^\w\s]/gi, "");
            idOrders_mother = idOrders_mother.replace(regsc, "");

            let order_quantity = req.body.order_quantity;
            order_quantity = order_quantity.replace(/[^\w\s]/gi, "");
            order_quantity = order_quantity.replace(regsc, "");

            let trackFedex = req.body.trackFedex;
            trackFedex = trackFedex.replace(/[^\w\s]/gi, "");
            trackFedex = trackFedex.replace(regsc, "");

            let trackDas = req.body.trackDas;
            trackDas = trackDas.replace(/[^\w\s]/gi, "");
            trackDas = trackDas.replace(regsc, "");

            let email = req.body.email;
            email = email.replace(regsc, "");


            if (idOrders_mother && order_quantity && trackFedex && trackDas) {
                let check = await Account.findOne({
                    token: token
                });
                if (check != null && check.permission) {
                    let order_mother = await Order.findOne({
                        _id: idOrders_mother
                    });
                    if (order_mother != null) {
                        let temp = order_mother.realquantity - order_quantity;
                        if (temp >= 0) {
                            const child_order = new Child_order({
                                idOrders_mother: idOrders_mother,
                                order_quantity: order_quantity,
                                trackFedex: trackFedex,
                                trackDas: trackDas,
                                idOrder: idOrder,
                                email: email,
                            });
                            let cr_order_child = await child_order.save();
                            let update = await Order.updateOne({
                                _id: idOrders_mother
                            }, {
                                realquantity: temp
                            });
                            res.status(200).json({
                                message: "Đặt hàng thành công!",
                                data: cr_order_child
                            });
                        } else {
                            res.status(400).json({
                                message: "Đặt hàng thất bại, Bạn không thể mua quá số lượng đã đặt!",
                            })
                        }
                    } else {
                        res.status(400).json({
                            message: "Đặt hàng thất bại!"
                        });
                    }
                } else {
                    res.status(400).json({
                        message: "Không có quyền thực thi!"
                    });
                }
            }
        }catch (ex) {
            res.status(400).json({
                message: "Lỗi hệ thống"
            });
        }
    },

    editorder: async (req, res) => {
        let update = req.body.quantity;
        let token = req.body.token;
        let _id = req.body._id;
        const filter = {
            _id: _id
        }
        let check = await Account.findOne({
            token: token
        });
        try {
            if (check.permission == 10) {
                let findOrder = Order.findOne({filter});
                try{
                    if(findOrder.quantity <= update){
                        let result = await Order.updateOne(filter, {quantity: update});
                        if (result != null) {
                            res.status(200).json({
                                message: "Thay đổi mật khẩu thành công!"
                            });
                        } else {
                            res.status(400).json({
                                message: "Chỉnh sửa đơn hàng thất bại!"
                            });
                        }
                    }
                }catch(ex){
                    res.status(400).json({
                        message: "Chỉnh sửa đơn hàng thất bại do không tìm thấy đơn hàng!"
                    });
                }
                
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } catch (ex) {
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
    getorderbyaccount: async (req, res) => {
        try{
            let token = req.body.token;

            if (token) {
                let check = await Account.findOne({
                    token: token
                });
                if (check.permission == 10) {
                    let result = await Order.find();
                    res.status(200).json({
                        message: "Lấy danh sách đơn hàng thành công!",
                        data: result
                    });
                } else {
                    const filter = {
                        idShiper: check._id
                    }
                    let result = await Order.find(filter);
                    res.status(200).json({
                        message: "Lấy danh sách đơn hàng thành công!",
                        data: result
                    });
                }
            }else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } catch (ex) {
            res.status(400).json({
                message: "Lỗi hệ thống!"
            });
        }
    },
    getbyidorder: async (req, res) => {
        try{
            let token = req.body.token;
            let idOrders_mother = req.body.idOrders_mother;
            if(token){
                let check = await Account.findOne({token: token});
                if(check != null){
                    let rs_order = await Order.findOne({_id: idOrders_mother});
                    let rs = await Child_order.find({idOrders_mother: idOrders_mother});
                    let total_price = rs_order.price * rs.length;
                    let total_pay = rs_order.pay_price * rs.length;
                    let quantity_remaining = rs_order.realquantity + "/" + rs_order.quantity;
                    res.status(200).json({
                        message: "Lấy thông tin đơn hàng thành công!",
                        data: rs_order,
                        data_child: rs,
                        total_price: total_price,
                        total_pay: total_pay,
                        quantity_remaining: quantity_remaining
                    });
                }
            }else{
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
            
        }catch(ex){
            res.status(400).json({
                message: "Lỗi hệ thống!",
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
    donepay: async (req, res) => {
        let token = req.body.token;
        let _id = req.body._id;
        const filter = {
            _id: _id
        }
        let check = await Account.findOne({
            token: token
        });
        try {
            if (check.permission == 10) {
                let result = await Order.findOneAndUpdate(filter, {
                    status: 4
                });
                console.log(result);
                if (result != null) {
                    res.status(200).json({
                        message: "Thanh toán thành công!"
                    });
                } else {
                    res.status(400).json({
                        message: "Thanh toán thất bại!"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } catch (ex) {
            res.status(400).json({
                message: "Không có quyền thực thi!"
            });
        }
    },

    deleteorder: async (req, res) => {
        try {
            let token = req.body.token;
            let _id = req.body._id;
            let check = await Account.findOne({
                token: token
            });
            if (check.permission == 10) {
                const filter = {
                    _id: _id
                }
                let delete_result = await Order.findOneAndDelete(filter);
                if (delete_result != null) {
                    res.status(200).json({
                        message: "Xóa đơn hàng thành công!"
                    });
                } else {
                    res.status(400).json({
                        message: "Xóa đơn hàng thất bại!"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } catch (err) {
            res.status(400).json({
                message: "Lỗi hệ thống"
            });
        }
    },
}