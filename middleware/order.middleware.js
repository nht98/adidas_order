module.exports = {
    bookorder: function (req, res, next) {
        if (!req.body.linkOrder) {
            res.status(400).json({
                message: "Link order không được để trống"
            });
            return;
        }
        if (!req.body.quantity) {
            res.status(400).json({
                message: "Số lượng không được để trống"
            });
            return;
        }

        if (!req.body.address_ship) {
            res.status(400).json({
                message: "Địa chỉ ship không được để trống"
            });
            return;
        }

        if (!req.body.image) {
            res.status(400).json({
                message: "Ảnh không được để trống"
            });
            return;
        }

        if (!req.body.nation) {
            res.status(400).json({
                message: "Quốc gia không được để trống"
            });
            return;
        }

        if (!req.body.nameProduct) {
            res.status(400).json({
                message: "Tên sản phẩm không được để trống"
            });
            return;
        }

        if (!req.body.price) {
            res.status(400).json({
                message: "Giá không được để trống"
            });
            return;
        }
        if (!req.body.token) {
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        next();
    },

    childorder: function (req, res, next) {
        let resgc = /<>|<|>/ig;
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!req.body.token || req.body.token.match(resgc)) {
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        if (!req.body.idOrder) {
            res.status(400).json({
                message: "id đơn hàng không được để trống!"
            });
            return;
        }
        if (req.body.idOrder.match(resgc)) {
            res.status(400).json({
                message: "Mời nhập lại id đơn hàng"
            });
            return;
        }
        if (!req.body.order_quantity) {
            res.status(400).json({
                message: "Số lượng đơn hàng không được để trống"
            });
            return;
        }
        if (req.body.order_quantity < 0 || req.body.order_quantity.match(resgc)) {
            res.status(400).json({
                message: "Mời nhập lại số lượng đơn hàng"
            });
            return;
        }
        if (!req.body.trackFedex) {
            res.status(400).json({
                message: "TrackFedex được để trống"
            });
            return;
        }
        if (req.body.trackFedex.match(resgc)) {
            res.status(400).json({
                message: "Mời nhập lại track Fedex"
            });
            return;
        }
        if (!req.body.email) {
            res.status(400).json({
                message: "Email không được để trống"
            });
            return;
        }
        if (!req.body.email.match(mailformat)) {
            res.status(400).json({
                message: "Mời nhập lại email"
            });
            return;
        }
        if (!req.body.idOrders_mother) {
            res.status(400).json({
                message: "ID đơn gốc không được để trống"
            });
            return;
        }
        if (req.body.idOrders_mother.match(resgc)) {
            res.status(400).json({
                message: "Mời nhập lại id đơn hàng mẹ"
            });
            return;
        }
        
        next();
    },
    getorderbyaccount: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        if(req.body.token.match(resgc)){
            res.status(400).json({
                message: "Mời nhập lại"
            });
            return;
        }
        next();
    },
    receive_order: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        if(!req.body._id){
            res.status(400).json({
                message: "ID đơn hàng không được để trống"
            });
            return;
        }
        // if(req.body._id.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
    getbyidorder: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        if(!req.body.idOrders_mother){
            res.status(400).json({
                message: "ID đơn hàng không được để trống"
            });
            return;
        }
        // if(req.body.idOrders_mother.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
    getorderbystatus: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });

        //     return;
        // }
        if(!req.body.status){
            res.status(400).json({
                message: "status không được để trống"
            });
            return;
        }
        // if(req.body.status.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
    donepay: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        if(!req.body._id){
            res.status(400).json({
                message: "ID đơn hàng không được để trống"
            });
            return;
        }
        // if(req.body._id.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
    getorderpublic: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
    cancelorder: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        if(!req.body._id){
            res.status(400).json({
                message: "ID đơn hàng không được để trống"
            });
            return;
        }
        // if(req.body._id.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
    editorder: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        if(!req.body.quantity){
            res.status(400).json({
                message: "Số lượng đơn hàng không được để trống"
            });
            return;
        }
        if(!req.body._id){
            res.status(400).json({
                message: "ID đơn hàng không được để trống"
            });
            return;
        }
        next();
    },
    total_received: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
    total_donepay: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
    total_wage: function(req, res, next) {
        let resgc = /<>|<|>/ig;
        if(!req.body.token){
            res.status(400).json({
                message: "Token không được để trống"
            });
            return;
        }
        // if(req.body.token.match(resgc)){
        //     res.status(400).json({
        //         message: "Mời nhập lại"
        //     });
        //     return;
        // }
        next();
    },
}