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

    function checkSet(json, opt, key, expected) {
        if (opt[key] && typeof opt[key] == expected)
            json[key] = opt[key];
    }

    function send(to, data, opt, cb) {

        let options = JSON.parse(JSON.stringify(this.options));

        var json = options.json;

        if (typeof opt == "function")
            cb = opt;

        json.to = to;
        json.data = data;

        checkSet(json, opt, "collapse_key", "string");
        checkSet(json, opt, "time_to_live", "number");
        checkSet(json, opt, "delay_while_idle", "boolean");
        checkSet(json, opt, "notification", "object");

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
        message: function(to, data, opt, cb) {
            send(to, data, opt, cb);
        },
        topic: function(topic, data, opt, cb) {
            send("/topics/" + topic, data, opt, cb);
        }
    };

}