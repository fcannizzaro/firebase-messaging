# firebase-messaging
NodeJS module to send firebase messages

# Install
`npm install firebase-messagging`

## topic(topic, data, [, callback])
Send message to topic

## message(to, data, [, callback])
Send message to device
 
# Usage

```javascript

const firebase = require("firebase-messaging");

var client = firebase(CLOUD_MESSAGING_KEY);

var data = {
    title: "@Test",
    content: "@Content"
};

client.topic("news", data, function(result){
	// request err or message id
	console.log(result);	
});

client.message(DEVICE_TOKEN, data);

```