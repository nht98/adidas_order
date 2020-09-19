const request = require('request-promise');
module.exports = {
    getinfo: async (req, res) => {
        let url = req.body.url;
        const getTOken = {
            method: 'GET',
            uri: url,
            headers: {
                'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
            }
        };
        request(getTOken).then(data => {
            let reName = /"name":"(.+?)","image":/gm;
            let reImage = /"image":\["(.+?)","/gm;
            let rePrice = /"price":"(.+?)","/gm;
            let Image = reImage.exec(data);
            let Name = reName.exec(data);
            let Price = rePrice.exec(data);
            res.status(200).json({
                data: {
                    image: Image[1],
                    name: Name[1],
                    price: Price[1]
                }
            })
        }).catch(function () {
            res.status(400).json({
                message: "Thất bại",
                data: null
            });
        });
    },
}