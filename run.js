var request = require("request");
var parseString = require("xml2js").parseString;
var _url = "https://hooks.slack.com/services/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";


//var _data = {
//        "text": "A very important thing has occurred! <https://alert-system.com/alerts/1234|Click here> for details!"
//    };

//request.get("http://rss.cnn.com/rss/cnn_topstories.rss", 



request
    .get("http://rss.cnn.com/rss/cnn_topstories.rss", function (err, res, body) {
        console.log(res.statusCode); // 200 
        var _text = "Top Stories from CNN<br><br>";
        parseString(body, function (err, xmljs) {

            var items = xmljs.rss.channel[0].item;
            var _attachments = [];
            console.log("there are ", items.length, " items in the queue");

            items.forEach(function (v, i) {

                var _article = {
                    "color": "#3f3c72",
                    "author_name": "CNN",
                    "author_link": "http://www.cnn.com",
                    "title": v.title[0],
                    "title_link": v.link[0]



                };
                _attachments.push(_article);

                //                            _text += "<" + v.link[0] + "|" + v.title[0] + "><br><br>";
                //                            //                console.log("Title : ", v.title[0]);
                //                            //                console.log("Link : ", v.link[0]);
                //                            //                console.log("Published : ", v.pubDate[0]);
                if (i === 10) {
                    var _data = {
                        "text": "Top Stories from CNN", "attachments": _attachments, "channel":"@lionata"
                    };
                    request.post({
                        url: _url,
                        body: _data,
                        json: true
                    }, function optionalCallback(err, res, body) {
                        if (err) {
                            return console.error('upload failed:', err);
                        }
                        console.log('Upload successful!  Server responded with:', body);
                    });
                }

            });
            //console.log(xmljs.rss.channel[0].item[0]);
        });



        //console.log(body); // 'image/png' 
    });




//var _data = {"text": "Just what do you think you are doing Alyssa? <http://i.imgur.com/mlseBR4.gif>", "channel": "@alyssa"};
//