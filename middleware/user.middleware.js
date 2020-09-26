module.exports = {
    login: function(req, res, next) {
        if(!req.body.username){
            res.status(400).json({
                message: "Thiếu trường thông tin tài khoản"
            });
            return;
        }
        if(!req.body.password){
            res.status(400).json({
                message: "Mật khẩu không được để trống"
            });
            return;
        }
        next();
    },

    changePassword: function(req, res, next) {
        if(!req.body.username){
            res.status(400).json({
                message: "Thiếu trường thông tin tài khoản"
            });
            return;
        }
        if(!req.body.password){
            res.status(400).json({
                message: "Mật khẩu không được để trống"
            });
            return;
        }
        if(!req.body.newpassword){
            res.status(400).json({
                message: "Mật khẩu không được để trống"
            });
            return;
        }
        next();
    },

    reg: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        if(!req.body.username){
            res.status(400).json({
                message: "Tài khoản không được để trống"
            });
            return;
        }
        if(!req.body.password){
            res.status(400).json({
                message: "Mật khẩu không được để trống"
            });
            return;
        }
        if(!req.body.full_name){
            res.status(400).json({
                message: "Điền đầy đủ tên tài khoản"
            });
            return;
        }
        if(!req.body.permission){
            res.status(400).json({
                message: "Vui lòng chọn quyền cho tài khoản"
            });
            return;
        }
        if(!req.body.address){
            res.status(400).json({
                message: "Vui lòng chọn quốc gia cho tài khoản"
            });
            return;
        }
        next();
    },
}