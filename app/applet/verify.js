const https = require('https');
https.get('https://res.cloudinary.com/dyw9qoe1j/image/upload/f_auto,q_auto/5c08af50457fda6ebaf282803f72db76', res => {
    console.log(res.statusCode, res.headers);
});
