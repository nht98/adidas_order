const request = require('request-promise');
var http = new chilkat.Http();
module.exports = {
    getinfo: async (req, res) => {
        const rePage = /https:\/\/(.+?)\//gm
        let url = req.body.url;
        try{ 

            var nation = rePage.exec(url);
            nation = nation[1];
            if(nation == 'www.adidas.com' || nation == 'www.adidas.de'){
                var data = http.QuickGetStr(url);
            let reName = /"name":"(.+?)","color"/gm;
            let reImage = /"image":\["(.+?)","/gm;
            let rePrice = /"price":(.+?)}}/gm;
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
            }
            if(nation == 'shop.adidas.jp'){
                var data = http.QuickGetStr(url);
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
            }
        }catch(ex){
            res.status(400).json({
                message: ex
            })
        }
    },
}