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

        if (!req.body.idShiper) {
            res.status(400).json({
                message: "ID shipper không được để trống"
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
        if (!req.body.nameShiper) {
            res.status(400).json({
                message: "Tên shipper không được để trống"
            });
            return;
        }
        next();
    },

    childorder: function (req, res, next) {
        if (!req.body.token) {
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

        if (!req.body.order_quantity) {
            res.status(400).json({
                message: "Số lượng đơn hàng không được để trống"
            });
            return;
        }

        if (!req.body.trackFedex) {
            res.status(400).json({
                message: "TrackFedex được để trống"
            });
            return;
        }

        if (!req.body.email) {
            res.status(400).json({
                message: "Email không được để trống"
            });
            return;
        }

        if (!req.body.idOrders_mother) {
            res.status(400).json({
                message: "ID đơn gốc không được để trống"
            });
            return;
        }
        const regsc = /script|html/ig;
        let idOrder = req.body.idOrder;
        req.body.idOrder = idOrder.replace('/[^\w\s]/gi', "");
        req.body.idOrder = idOrder.replace(regsc, "");

        let idOrders_mother = req.body.idOrders_mother;
        req.body.idOrders_mother = idOrders_mother.replace(/[^\w\s]/gi, "");
        req.body.idOrders_mother = idOrders_mother.replace(regsc, "");

        let order_quantity = req.body.order_quantity;
        req.body.order_quantity = order_quantity.replace(/[^\w\s]/gi, "");
        req.body.order_quantity = order_quantity.replace(regsc, "");

        let trackFedex = req.body.trackFedex;
        req.body.trackFedex = trackFedex.replace(/[^\w\s]/gi, "");
        req.body.trackFedex = trackFedex.replace(regsc, "");

        let trackDas = req.body.trackDas;
        req.body.trackDas = trackDas.replace(/[^\w\s]/gi, "");
        req.body.trackDas = trackDas.replace(regsc, "");

        let email = req.body.email;
        req.body.email = email.replace(regsc, "");

        next();
    },
}