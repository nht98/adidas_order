const rp = require('request-promise');
const request = require('request');
// var http = new chilkat.Http();
module.exports = {
    getinfo_jp: async (req, res) => {
        var data = 0;
        // const rePage = /https:\/\/(.+?)\//gm;
        let reName = /"name":"(.+?)","image":/gm;
        let reImage = /"image":\["(.+?)","/gm;
        let rePrice = /"price":"(.+?)","/gm;
        let url = req.body.url;
        // let host = rePage.exec(url);
        let options = {
            uri: url,
            headers: {
                'Host':'shop.adidas.jp',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type': 'application/json',
                'Accept-Encoding':'',
                'Connection':'keep-alive',
                'TE':'Trailers',
                'Upgrade-Insecure-Requests':'1'
            }
        };
        await rp.post(options, function(err, res, body) {
            if(err) {
                console.log(err);
            }else{
                data = body;
            }
        });
        let Image = reImage.exec(data);
        let Name = reName.exec(data);
        let Price = rePrice.exec(data);
        res.status(200).json({
            data:
                {     
                    image: Image[1],
                    name: Name[1],
                    price: Price[1]
                }
        });
    },

    getinfo_usa: async (req, res) => {
        var data = 0;
        let reName = /"name":"(.+?)","color"/gm;
        let reImage = /"image":\["(.+?)","/gm;
        let rePrice = /"price":(.+?)}}/gm;
        let url = req.body.url;
        let options = {
            uri: url,
            headers: {
                'Host': 'www.adidas.com',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type': 'application/json',
                'Accept-Encoding':'',
                'Connection':'keep-alive',
                'TE':'Trailers',
                'Upgrade-Insecure-Requests':'1'
            }
        };
        await rp.get(options, function(err, res, body) {
            if(err) {
                console.log(err);
            }else{
                data = body;
            }
        });
       
        let Image = reImage.exec(data);
        let Name = reName.exec(data);
        let Price = rePrice.exec(data);
        res.status(200).json({
            data:
                {     
                    image: Image[1],
                    name: Name[1],
                    price: Price[1]
                }
        });
    },

    getinfo_ger: async (req, res) => {
        var data = 0;
        let reName = /"name":"(.+?)","color"/gm;
        let reImage = /"image":\["(.+?)","/gm;
        let rePrice = /"price":(.+?)}}/gm;
        let url = req.body.url;
        let options = {
            uri: url,
            headers: {
                'Host': 'www.adidas.de',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type': 'application/json',
                'Accept-Encoding':'',
                'Connection':'keep-alive',
                'TE':'Trailers',
                'Upgrade-Insecure-Requests':'1'
            }
        };
        await rp.get(options, function(err, res, body) {
            if(err) {
                console.log(err);
            }else{
                data = body;
            }
        });
        let Image = reImage.exec(data);
        let Name = reName.exec(data);
        let Price = rePrice.exec(data);
        res.status(200).json({
            data:
                {     
                    image: Image[1],
                    name: Name[1],
                    price: Price[1]
                }
        });
    },
}
        // try{ 
        //     var nation = rePage.exec(url);
        //     nation = nation[1];
        //     if(nation == 'www.adidas.com' || nation == 'www.adidas.de'){
        //         var data = http.QuickGetStr(url);
        //     let reName = /"name":"(.+?)","color"/gm;
        //     let reImage = /"image":\["(.+?)","/gm;
        //     let rePrice = /"price":(.+?)}}/gm;
        //     let Image = reImage.exec(data);
        //     let Name = reName.exec(data);
        //     let Price = rePrice.exec(data);
        //     res.status(200).js
        //         data: {
        //             image: Image[1],
        //             name: Name[1],
        //             price: Price[1]
        //         }
        //     })
        //     }
        //     if(nation == 'shop.adidas.jp'){
        //         var data = http.QuickGetStr(url);
        //         let reName = /"name":"(.+?)","image":/gm;
        //         let reImage = /"image":\["(.+?)","/gm;
        //         let rePrice = /"price":"(.+?)","/gm;
        //         let Image = reImage.exec(data);
        //         let Name = reName.exec(data);
        //         let Price = rePrice.exec(data);
        //         res.status(200).json({
        //             data: {
        //                 image: Image[1],
        //                 name: Name[1],
        //                 price: Price[1]
        //             }
        //         })
        //     }
        // }catch(ex){
        //     res.status(400).json({
        //         message: ex
        //     })
        // }
//     },
// }