const request = require('request-promise');
module.exports = {
    getinfojp: async (req, res) => {
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
    getinfous: async (req, res) => {
        let url = req.body.url;
        const getTOken = {
            method: 'GET',
            uri: url,
            // headers: {
            //     // "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            //     // "accept-encoding": "gzip, deflate, br",
            //     // "accept-language": "vi;en;q=0.9",
            //     // "cache-control": "max-age=0",
            //     // "cookie": "badab=false; __cfduid=dd9edc1c61b3cef53eda1615788310a4a1600161137; UserSignUpAndSaveOverlay=0; ab_monetate=a; mt.v=5.85602668.1600161138727; akacd_phasedRC_FI_us_prod=3777934399~rv=81~id=402d61957487285f17a8e64aef10ac50; bm_sz=698712FB9CCE4BFD1075E5AC7379597C~YAAQhutGaAoos3F0AQAAACYjpAlWVvu+ILgZipQ5CUHjO0joXZelEVWj+9ftBdlEGKIPf2bhksLQkvWnLoUSLGh/+Cx41Wxcajy9c0gQTFH6A9sSHiLhTjLgok0UHm6FdwSPDTQxupBAAW8laG8Tk7iR0Ql36NaCK+RiimW+QjTKIHMDzKPckcUGP4IJY4ak; adidasCountrySelectorStats=Return=; ASPSESSIONIDSSDQRRDC=OONNDDDCCIPBHGBDPHJHOEFC; AWSELB=95ADB7E50C84216D4F0382FB851EE9236F353F155A2A5AE1CAAA9CAB7D22CF60917F5F41F1FCE66EC2CA8D5BAC67B4F8E41295307BFECDCDF4988FFD30BF1EB8046595AFB3; AWSELBCORS=95ADB7E50C84216D4F0382FB851EE9236F353F155A2A5AE1CAAA9CAB7D22CF60917F5F41F1FCE66EC2CA8D5BAC67B4F8E41295307BFECDCDF4988FFD30BF1EB8046595AFB3; geo_ip=171.237.63.199; dwac_bcl5MiaaieF4EaaadeoW6TIGjI=kqyF158hwz9ursFWJUQ_ywLIVBRrHOPv-x4%3D|dw-only|||USD|false|US%2FPacific|true; sid=kqyF158hwz9ursFWJUQ_ywLIVBRrHOPv-x4; geo_country=VN; onesite_country=US; geo_state=; gl-feat-enable=CHECKOUT_PAGES_ENABLED; default_searchTerms_CustomizeSearch=%5B%5D; wishlist=%5B%5D; persistentBasketCount=0; userBasketCount=0; pagecontext_cookies=; pagecontext_secure_cookies=; geoRedirectionAlreadySuggested=true; AKA_A2=A; dwanonymous_e23325cdedf446c9a41915343e601cde=bcX5FO0Jqqlapl7FUlXttXDv7B; fallback_dwanonymous_e23325cdedf446c9a41915343e601cde=bcX5FO0Jqqlapl7FUlXttXDv7B; dwsid=uyRrpb-8Sxtvd7Nfty0ZI9Jsd-BMXfBoKCJM9FNyHWz69J-Um_TD0sgJ2y3VxJWBJI6XjTJ9JUhuQ1yajQn18g==; fallback_dwsid=uyRrpb-8Sxtvd7Nfty0ZI9Jsd-BMXfBoKCJM9FNyHWz69J-Um_TD0sgJ2y3VxJWBJI6XjTJ9JUhuQ1yajQn18g==; akacd_phasedRC_gender=3777940780~rv=9~id=be3697963bfb04cb9d394fe2f36c9551; UserSignUpAndSave=3; bm_mi=D268E2E7A6036CE9A46613CDDC778113~hH7RCpgN7ae/sU7PHImIp31bMFL+DzUmUQAeVnlm+EbR3G05il83wDDwIyMv6l51OtfW+/qrQ34Dh4rXaJcTn33ORoAxoDTIIEVDKewF1MC5VESYNgoV5Wic8eL634xQV7vZBRG6DJGmQMJ3Dpb7HzEzgPvUR4uohq7h3mCvG3xPXWBZ2hgqAFzNEu2/CvlZoZzD9AsqzBr5O047HZn1jTagUEcwBc0OcfzbR1StaO1fHwd7e3Hub03V+Q0od1tjp+BJu8M/WrYZnjQVClFlIg==; adidas_country=on; _abck=07133C970E205AE3786B4F72BA13A546~-1~YAAQhutGaN89s3F0AQAA5eeHpARDJ0q4TQfDF8NXhys/1WJYyxFLeK8fWIM/qdjf+nb2YxAeJLCbjywvQO0jjVcY83ivlCUkKyc3qh4wJEYUj+8A2dVo1TdO/PaQw4bs6PaPvS4V4B0uNd9SE4vz9t7c77w6kvyOwstvzmVs4SDTmRLQ03uN6yV5YC/i75u7hZw9GK5SY9e0B5z/bA84z8GnGyKOIAEcefCOvJ8slbINoeGfAvcp25HcawOqdNYMQGTEqgPfHmKU9HsVqni7MXGL7ZoXlMP478VoLA6uLJ7N+GeUjn5+Fk7kjArU1slNDNcVuuInQbsZhBshLB1+h9vVUFc=~-1~-1~-1; ak_bmsc=E755D39B629DE5A45C3679E6070F5A576846EB865E3700000B83655F17E92772~plMVymtDrgFs3vlbQOJzI9lEuyvgLyfmt2GvsobWAOdPss5scATPGXCrYXc374oMrBeNL+Amm9RlTFXKXxT8xJflrF238SGYPwPNF36D4Aj9KZFpU2ZS04s4oQsAebRTlrlQCahnwFDO1JiXKcUTzDhYyn6TvtBr5XBSe3QmFhb5ec9X1WTUu7aaiYomJ46nOgPdKf/lotLpRqRQNPn3abfh7NLEoeRbZGbSL6n+MNX3oBQx0MksGyfLmcmoR6BHPBOQ7urAk9w8CyqeP1KFs3JQxvUP0CyAiQb4Z4H2VOSMlqymuM+VmdB/wu5IxqZc/lzpu1MoRhPoml0k8Osn9sSXnpunWzI25fohltpbtiR2OzpRkBZfePOnJSlNH+t6RXWyC46wAMOSmvGwpHHR6/2g==",
            //     // // "sec-fetch-dest": "document",
            //     // // "sec-fetch-mode": "navigate",
            //     // // "sec-fetch-site": "none",
            //     // // "sec-fetch-user": "?1",
            //     // //  "upgrade-insecure-requests": "1",
            //     // "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
            // }
        };
        request(getTOken).then(data => {
            let reName = /"name":"(.+?)","color":/gm;
            let reImage = /"image":\["(.+?)","/gm;
            let rePrice = /"USD","price":(.+?)}/gm;
            let Image = reImage.exec(data);
            let Name = reName.exec(data);
            let Price = rePrice.exec(data);
            console.log(data);
            console.log(Image);
            console.log(Name);
            console.log(Price);
            res.status(200).json({
                data: data
            })
        }).catch(function (ex) {
            res.status(400).json({
                message: "Thất bại",
                data: null
            });
        });
    },
}