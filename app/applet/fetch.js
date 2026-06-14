const https = require('https');

https.get('https://collection.cloudinary.com/dyw9qoe1j/5c08af50457fda6ebaf282803f72db76', (res) => {
  console.log('Status Code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Try to find image URLs in the response
    const matches = data.match(/https:\/\/(res|collection)\.cloudinary\.com\/[^"']+/g);
    console.log(matches ? [...new Set(matches)] : 'No matches found');
  });
}).on('error', (err) => {
  console.log('Error: ', err.message);
});
