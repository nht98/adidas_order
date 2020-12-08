const Order = require('../model/order.js');
const Account = require('../model/account.js');
const Child_order = require('../model/child_order');
const moment = require("moment");
module.exports = {
    // 0 : chờ shipper check đơn
    // 1 : đã vận chuyển
    // 2 : đã nhận
    // 3 : huỷ đơn
    // 4 : đã thanh toán
    bookorder: async (req, res) => {
        try {
            let size = 0;
            let colorProduct = "";
            colorProduct = req.body.colorProduct;
            let token = req.body.token;
            let status = 0;
            let trackDas = "";
            let trackFedex = "";
            let idOrder = req.body.idOrder;
            let realquantity = 0;
            let pay_price = 0;
            pay_price = req.body.price * 0.6;
            let total = 0;
            total = (req.body.quantity * pay_price) * (1 - (req.body.discount / 100));

            let date = Date.now();
            // let date = new Date().toLocaleString('en-US', {
            //     timeZone: 'Asia/BangKok'
            // });
            // let date = moment().toDate().toLocaleDateString('en-US', {timeZone: 'Asia/BangKok'});
            const order = new Order({
                linkOrder: req.body.linkOrder,
                size: req.body.size,
                quantity: req.body.quantity,
                realquantity: req.body.quantity,
                address_ship: req.body.address_ship,
                image: req.body.image,
                data_order: date,
                nation: req.body.nation,
                idShiper: req.body.idShiper,
                nameProduct: req.body.nameProduct,
                price: req.body.price,
                status: status,
                trackDas: trackDas,
                trackFedex: trackFedex,
                pay_price: pay_price,
                nameShiper: req.body.nameShiper,
                idOrder: idOrder,
                discount: req.body.discount,
                total: total,
            });
            let check = await Account.findOne({
                token: token
            });
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
        } catch (err) {
            res.status(400).json({
                message: "Lỗi hệ thống"
            })
        }

    },

    childorder: async (req, res) => {
        // let date = new Date().toLocaleString('en-US', {
        //     timeZone: 'Asia/Bangkok'
        // });
        try {
            let date = Date.now();
            let check = await Account.findOne({
                token: req.body.token
            });
            try {
                let order_mother = await Order.findOne({
                    _id: req.body.idOrders_mother
                });
                try {
                    let temp = order_mother.realquantity - req.body.order_quantity;
                    if (temp >= 0) {
                        const child_order = new Child_order({
                            idOrders_mother: req.body.idOrders_mother,
                            order_quantity: req.body.order_quantity,
                            trackFedex: req.body.trackFedex,
                            trackDas: (req.body.trackDas) ? req.body.trackDas : "",
                            status: (req.body.status) ? req.body.status : "",
                            idOrder: req.body.idOrder,
                            email: req.body.email,
                            data_order: date,
                        });
                        let cr_order_child = await child_order.save();
                        let update = await Order.updateOne({
                            _id: req.body.idOrders_mother
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
                } catch (ex) {
                    res.status(400).json({
                        message: "Đặt hàng thất bại!"
                    });
                }
            } catch (e) {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } catch (e) {
            res.status(400).json({
                message: "Lỗi hệ thống"
            });
        }

    },

    editorder: async (req, res) => {
        try {
            let update = req.body.quantity;
            let token = req.body.token;
            let _id = req.body._id;
            let filter = {
                _id: _id
            }
            let check = await Account.findOne({
                token: token
            });
            try {
                if (check.permission == 10) {
                    let findOrder = await Order.findOne(filter);
                    try {
                        let change_realquantity = 0;
                        let change = Math.abs(update - findOrder.quantity);
                        if (update < 0 || update < findOrder.quantity) {
                            res.status(400).json({
                                message: "Mời nhập lại số lượng"
                            });
                        } else {
                            if (update == 0) {
                                change_realquantity == 0;
                            } else if (update >= findOrder.realquantity) {
                                change_realquantity = findOrder.realquantity + change;
                            } else {
                                change_realquantity = findOrder.realquantity - change;
                            }
                            let result = await Order.findOneAndUpdate(filter, {
                                quantity: update,
                                realquantity: change_realquantity,
                                total: (update * findOrder.pay_price) * (1 - (findOrder.discount / 100))
                            }, {
                                new: true
                            });
                            if (result != null) {
                                res.status(200).json({
                                    message: "Chỉnh sửa đơn hàng thành công!"
                                });
                            } else {
                                res.status(400).json({
                                    message: "Chỉnh sửa đơn hàng thất bại!"
                                });
                            }
                        }
                    } catch (ex) {
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
        } catch (e) {
            res.status(400).json({
                message: "Lỗi hệ thống"
            });
        }

    },
    cancelorder: async (req, res) => {
        try {
            let token = req.body.token;
            let _id = req.body._id;
            const filter = {
                _id: _id
            }
            if (token) {
                let check = await Account.findOne({
                    token: token
                });
                if (check.permission == 10 || check.permission == 1) {
                    let result = await Order.findOneAndUpdate(filter, {
                        status: 3,
                        $unset: {
                            idShiper: 1,
                            nameShiper: 1
                        }
                    }, {
                        new: true
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
        } catch (ex) {
            res.status(400).json({
                message: "Lỗi hệ thống"
            });
        }

    },
    receive_order: async (req, res) => {
        try {
            let token = req.body.token;
            let _id = req.body._id;
            let check = await Account.findOne({
                token: token
            });
            if (check != null) {
                if (check.permission == 10 || check.permission == 1) {
                    let rs = await Order.findOneAndUpdate({
                        _id: _id
                    }, {
                        status: 2,
                        idShiper: check._id,
                        nameShiper: check.full_name
                    }, {
                        new: true
                    });
                    if (rs != null) {
                        res.status(200).json({
                            message: 'Nhận đơn thành công!'
                        });
                    } else {
                        res.status(200).json({
                            message: 'Nhận đơn thất bại!'
                        });
                    }
                }
            } else {
                res.status(404).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } catch (ex) {
            res.status(404).json({
                message: "Lỗi hệ thống"
            });
        }

    },
    getorderbyaccount: async (req, res) => {
        try {
            let token = req.body.token;
            if (token) {
                let check = await Account.findOne({
                    token: token
                });
                if (check.permission == 10) {
                    let filter = {};
                    if (!req.body.key) {
                        filter = {
                            idShiper: {
                                $exists: true
                            },
                            nameShiper: {
                                $exists: true
                            },
                        };
                    } else {
                        filter = {
                            idShiper: {
                                $exists: true
                            },
                            nameShiper: {
                                $exists: true
                            },
                            $or: [{
                                    nameProduct: new RegExp(req.body.key.trim(), 'i')
                                },
                                {
                                    size: new RegExp(req.body.key.trim(), 'i')
                                },
                                {
                                    address_ship: new RegExp(req.body.key.trim(), 'i')
                                },
                                {
                                    nation: new RegExp(req.body.key.trim(), 'i')
                                },
                                {
                                    trackDas: new RegExp(req.body.key.trim(), 'i')
                                },
                                {
                                    trackFedex: new RegExp(req.body.key.trim(), 'i')
                                },
                                {
                                    nameShiper: new RegExp(req.body.key.trim(), 'i')
                                }
                            ]
                        };
                    }
                    // let filter = {
                    //     idShiper: {
                    //         $exists: true
                    //     },
                    //     nameShiper: {
                    //         $exists: true
                    //     },
                    //     $or: [{
                    //             nameProduct: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             size: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             address_ship: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             nation: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             trackDas: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             trackFedex: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             nameShiper: new RegExp(req.body.key.trim(), 'i')
                    //         }
                    //     ]
                    // };
                    const perPage = 10;
                    const page = parseInt(req.query.page || 1);
                    const skip = (perPage * page) - perPage;
                    const result = await Order.find(filter).sort({
                        data_order: -1
                    }).skip(skip).limit(perPage);
                    const totalOrder = await Order.countDocuments(filter);
                    const totalPage = Math.ceil(totalOrder / perPage);
                    let total_s = 0;
                    for (let i = 0; i < result.length; i++) {
                        total_s += result[i].total;
                    }
                    res.status(200).json({
                        message: "Lấy danh sách đơn hàng thành công!",
                        data: result,
                        meta: {
                            page,
                            perPage,
                            totalOrder,
                            totalPage,
                            totalPrice: total_s,
                        }
                    });
                } else {
                    let filter = {};
                    if(!req.body.key){
                        filter = {
                            idShiper: check._id
                        }
                    }else{
                        filter = {
                            idShiper: check._id,
                        $or: [{
                                nameProduct: new RegExp(req.body.key.trim(), 'i')
                            },
                            {
                                size: new RegExp(req.body.key.trim(), 'i')
                            },
                            {
                                address_ship: new RegExp(req.body.key.trim(), 'i')
                            },
                            {
                                trackDas: new RegExp(req.body.key.trim(), 'i')
                            },
                            {
                                trackFedex: new RegExp(req.body.key.trim(), 'i')
                            },
                        ]
                        }
                    }
                    // let filter = {
                    //     idShiper: check._id,
                    //     $or: [{
                    //             nameProduct: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             size: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             address_ship: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             trackDas: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //         {
                    //             trackFedex: new RegExp(req.body.key.trim(), 'i')
                    //         },
                    //     ]
                    // };
                    const perPage = 10;
                    const page = parseInt(req.query.page || 1);
                    const skip = (perPage * page) - perPage;
                    const result = await Order.find(filter).sort({
                        data_order: -1
                    }).skip(skip).limit(perPage);
                    const totalOrder = await Order.countDocuments(filter);
                    const totalPage = Math.ceil(totalOrder / perPage);
                    let total_s = 0;
                    for (let i = 0; i < result.length; i++) {
                        total_s += result[i].total;
                    }
                    res.status(200).json({
                        message: "Lấy danh sách đơn hàng thành công!",
                        data: result,
                        meta: {
                            page,
                            perPage,
                            totalOrder,
                            totalPage,
                            totalPrice: total_s,
                        }
                    });
                }
            } else {
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
        try {
            let token = req.body.token;
            let idOrders_mother = req.body.idOrders_mother;
            if (token) {
                let check = await Account.findOne({
                    token: token
                });
                if (check != null) {
                    let rs_order = await Order.findOne({
                        _id: idOrders_mother
                    });

                    let filter = {
                        idOrders_mother: idOrders_mother
                    }
                    let perPage = 10;
                    let page = parseInt(req.query.page || 1);
                    let skip = (perPage * page) - perPage;
                    let rs = await Child_order.find({
                        idOrders_mother: idOrders_mother
                    }).sort({
                        data_order: -1
                    }).skip(skip).limit(perPage);
                    let totalChild_Order = await Child_order.countDocuments(filter);
                    let totalPage = Math.ceil(totalChild_Order / perPage);
                    let total_price = rs_order.price * rs.length;
                    let total_pay = rs_order.pay_price * rs.length;
                    let quantity_remaining = rs_order.realquantity + "/" + rs_order.quantity;

                    res.status(200).json({
                        message: "Lấy thông tin đơn hàng thành công!",
                        data: rs_order,
                        data_child: rs,
                        total_price: total_price,
                        total_pay: total_pay,
                        quantity_remaining: quantity_remaining,
                        meta: {
                            page,
                            perPage,
                            totalChild_Order,
                            totalPage,
                        }
                    });
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }

        } catch (ex) {
            res.status(400).json({
                message: "Lỗi hệ thống!",
            });
        }
    },
    getorderbystatus: async (req, res) => {
        try {
            let token = req.body.token;
            let status = req.body.status;
            if (token != null) {
                let check = await Account.findOne({
                    token: token
                });
                if (check.permission == 10) {
                    const filter = {
                        status: status,
                    }
                    let perPage = 10;
                    let page = parseInt(req.query.page || 1);
                    let skip = (perPage * page) - perPage;
                    let result = await Order.find(filter).sort({
                        data_order: -1
                    }).skip(skip).limit(perPage);
                    let totalOrder = await Order.countDocuments(filter);
                    let totalPage = Math.ceil(totalOrder / perPage);
                    res.status(200).json({
                        message: "Lấy danh sách đơn hàng thành công!",
                        data: result,
                        meta: {
                            page,
                            perPage,
                            totalOrder,
                            totalPage,
                        }
                    });
                } else {
                    const filter = {
                        status: status,
                        idShiper: check._id
                    }
                    let perPage = 10;
                    let page = parseInt(req.query.page || 1);
                    let skip = (perPage * page) - perPage;
                    let result = await Order.find(filter).sort({
                        data_order: -1
                    }).skip(skip).limit(perPage);
                    let totalOrder = await Order.countDocuments(filter);
                    let totalPage = Math.ceil(totalOrder / perPage);
                    res.status(200).json({
                        message: "Lấy danh sách đơn hàng thành công!",
                        data: result,
                        meta: {
                            page,
                            perPage,
                            totalOrder,
                            totalPage,
                        }
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
    donepay: async (req, res) => {
        try {
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
                    }, {
                        new: true
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
        } catch (e) {
            res.status(400).json({
                message: "Lỗi hệ thống"
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
    getorderpublic: async (req, res) => {
        try {
            let token = req.body.token;
            let filter = {};
            if (!req.body.key) {
                filter.idShiper = {
                    $exists: false
                }
            } else {
                filter = {
                    idShiper: {
                        $exists: false
                    },
                    $or: [{
                            nameProduct: new RegExp(req.body.key.trim(), 'i')
                        },
                        {
                            size: new RegExp(req.body.key.trim(), 'i')
                        },
                        {
                            address_ship: new RegExp(req.body.key.trim(), 'i')
                        },
                        {
                            nation: new RegExp(req.body.key.trim(), 'i')
                        },
                        {
                            trackDas: new RegExp(req.body.key.trim(), 'i')
                        },
                        {
                            trackFedex: new RegExp(req.body.key.trim(), 'i')
                        },
                    ]
                }
            }
            if (token) {
                let check = await Account.findOne({
                    token: token
                });
                if (check.permission == 10 || check.permission == 1) {
                    const perPage = 10;
                    const page = parseInt(req.query.page || 1);
                    const skip = (perPage * page) - perPage;
                    const result = await Order.find(filter).sort({
                        data_order: -1
                    }).skip(skip).limit(perPage);
                    const totalOrder = await Order.countDocuments(filter);
                    const totalPage = Math.ceil(totalOrder / perPage);
                    let total_s = 0;
                    for (let i = 0; i < result.length; i++) {
                        total_s += result[i].total;
                    }
                    res.status(200).json({
                        message: "Lấy danh sách đơn hàng thành công!",
                        data: result,
                        meta: {
                            page,
                            perPage,
                            totalOrder,
                            totalPage,
                            totalPrice: total_s,
                        }
                    });
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
        } catch (ex) {
            res.status(400).json({
                message: "Lỗi hệ thống!"
            });
        }
    },
}