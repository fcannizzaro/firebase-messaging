const request = require("request");

module.exports = function(firebase_key) {

    this.options = {
        url: "https://fcm.googleapis.com/fcm/send",
        method: "POST",
        headers: {
            "Authorization": "key=" + firebase_key,
            "Content-Type": "application/json"
        },
        json: {}
    };

    function send(to, data, cb) {

        let options = JSON.parse(JSON.stringify(this.options));
        options.json.to = to;
        options.json.data = data;

        request(options, function(err, response, body) {

            if (cb)
                if (body != null)
                    try {
                        cb(JSON.parse(body));
                    } catch (err) {
                        cb(body);
                    } else
                        cb(err);

        });
    }

    return {
        message: function(to, data, cb) {
            send(to, data, cb);
        },
        topic: function(topic, data, cb) {
            send("/topics/" + topic, data, cb);
        }
    };

}