const https = require('https');

https.get('https://collection.cloudinary.com/dyw9qoe1j/5c08af50457fda6ebaf282803f72db76', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => console.log('Body start:', data.substring(0, 100)));
});
