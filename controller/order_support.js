const request = require('request-promise');
module.exports = {
    getinfo: async (req, res) => {
        let reid;
        reurl = /https:\/\/(.+?).adidas/gm;
        reid = /\/(.+?)\/(.+?)\/(.+?)\/(.+?).html/gm;
        let pageName = reurl.exec(req.body.url);
        let idProduct = reid.exec(req.body.url);
        if (pageName[1] == "www") {
            let url = "https://www.adidas.com/api/products/" + idProduct[4] + "?sitePath=us";
            console
            const getData = {
                method: 'GET',
                uri: url
            };
            console.log(url);
            request(getData).then(data_info => {
                data_info = JSON.parse(data_info);
                console.log(data_info);
                res.status(200).json({
                    message: "Thành công",
                    data: {
                        info: {
                            id_product: data_info.id,
                            name_product: data_info.name,
                            image_product: (data_info.product_description.description_assets.image_url) ? data_info.product_description.description_assets.image_url : "",
                        },
                    },
                });
            }).catch(function () {
                res.status(400).json({
                    message: "Thất bại",
                    data: null
                });
            });
        } else {
            res.status(400).json({
                message: "Thất bại",
                data: null
            });
        }


    },
    getstatus: async (req, res) => {

    },
}