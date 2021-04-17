// const fs = require('fs');
// const request = require('request');

// const download = (url, dest, cb) => {
    // const file = fs.createWriteStream(dest);
    // const sendReq = request.get(url);

    // // verify response code
    // sendReq.on('response', (response) => {
        // if (response.statusCode !== 200) {
            // return cb('Response status was ' + response.statusCode);
        // }

        // sendReq.pipe(file);
    // });

    // // close() is async, call cb after close completes
    // file.on('finish', () => file.close(cb));

    // // check for request errors
    // sendReq.on('error', (err) => {
        // fs.unlink(dest);
        // return cb(err.message);
    // });

    // file.on('error', (err) => { // Handle errors
        // fs.unlink(dest); // Delete the file async. (But we don't check the result)
        // return cb(err.message);
    // });
// };

// download('https://snaptik.app/dl.php?token=aHR0cHM6Ly92NzcudGlrdG9rY2RuLmNvbS8wN2Q0MjdlZGM1N2M4NmYxZGMwMzQyZTk4MGYwMWRkNi82MDE3YThlNy92aWRlby90b3MvdXNlYXN0MmEvdG9zLXVzZWFzdDJhLXZlLTAwNjhjMDAzLzc1MzdiZWFkMmZlMDQ3MDJhNTNhMWE1ZjFjMjQxMGU4Lz9hPTExODAmYW1wO2JyPTI2ODImYW1wO2J0PTEzNDEmYW1wO2NkPTAlN0MwJTdDMCZhbXA7Y2g9MCZhbXA7Y3I9MCZhbXA7Y3M9MCZhbXA7ZHI9MCZhbXA7ZHM9NiZhbXA7ZXI9JmFtcDtsPTIwMjEwMjAxMDEwODE4MDEwMjM0MDkzMTU4NTgwMDFENTAmYW1wO2xyPSZhbXA7bWltZV90eXBlPXZpZGVvX21wNCZhbXA7cGw9MCZhbXA7cXM9MCZhbXA7cmM9TTJ3N09HeHhaV2RyTXpNek96Y3pNMEFwUEdSb05UUTZaenM3TjJnNU5HbG1abWR4YldKc01WNWlNRjlnTFMweE1UWnpjell6TTE0eE1EVXZOR0l3TFRJek1tRTZZdyUzRCUzRCZhbXA7dmw9JmFtcDt2cj0%3D&name=kenton&id_video=6924022404469640454','videotest.mp4',test)

// function test(data){
	// console.log(data);
// }


// var download = function(url, dest, cb) {
  // var file = fs.createWriteStream(dest);
  // http.get(url, function(response) {
    // response.pipe(file);
    // file.on('finish', function() {
      // file.close(cb);
    // });
  // });
// }
// download()

// const Fs = require('fs')  
// const Path = require('path')  
// const Axios = require('axios')

// Axios({
    // method: "get",
    // url: "https://snaptik.app/dl.php?token=aHR0cHM6Ly92NzcudGlrdG9rY2RuLmNvbS8wN2Q0MjdlZGM1N2M4NmYxZGMwMzQyZTk4MGYwMWRkNi82MDE3YThlNy92aWRlby90b3MvdXNlYXN0MmEvdG9zLXVzZWFzdDJhLXZlLTAwNjhjMDAzLzc1MzdiZWFkMmZlMDQ3MDJhNTNhMWE1ZjFjMjQxMGU4Lz9hPTExODAmYW1wO2JyPTI2ODImYW1wO2J0PTEzNDEmYW1wO2NkPTAlN0MwJTdDMCZhbXA7Y2g9MCZhbXA7Y3I9MCZhbXA7Y3M9MCZhbXA7ZHI9MCZhbXA7ZHM9NiZhbXA7ZXI9JmFtcDtsPTIwMjEwMjAxMDEwODE4MDEwMjM0MDkzMTU4NTgwMDFENTAmYW1wO2xyPSZhbXA7bWltZV90eXBlPXZpZGVvX21wNCZhbXA7cGw9MCZhbXA7cXM9MCZhbXA7cmM9TTJ3N09HeHhaV2RyTXpNek96Y3pNMEFwUEdSb05UUTZaenM3TjJnNU5HbG1abWR4YldKc01WNWlNRjlnTFMweE1UWnpjell6TTE0eE1EVXZOR0l3TFRJek1tRTZZdyUzRCUzRCZhbXA7dmw9JmFtcDt2cj0%3D&name=kenton&id_video=6924022404469640454",
    // responseType: "stream",
	// headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36' }
// }).then(function (response) {
    // response.data.pipe(Fs.createWriteStream("testing.mp4"));
// });

// async function downloadImage () {  
  // const url = 'https://snaptik.app/dl.php?token=aHR0cHM6Ly92NzcudGlrdG9rY2RuLmNvbS8wN2Q0MjdlZGM1N2M4NmYxZGMwMzQyZTk4MGYwMWRkNi82MDE3YThlNy92aWRlby90b3MvdXNlYXN0MmEvdG9zLXVzZWFzdDJhLXZlLTAwNjhjMDAzLzc1MzdiZWFkMmZlMDQ3MDJhNTNhMWE1ZjFjMjQxMGU4Lz9hPTExODAmYW1wO2JyPTI2ODImYW1wO2J0PTEzNDEmYW1wO2NkPTAlN0MwJTdDMCZhbXA7Y2g9MCZhbXA7Y3I9MCZhbXA7Y3M9MCZhbXA7ZHI9MCZhbXA7ZHM9NiZhbXA7ZXI9JmFtcDtsPTIwMjEwMjAxMDEwODE4MDEwMjM0MDkzMTU4NTgwMDFENTAmYW1wO2xyPSZhbXA7bWltZV90eXBlPXZpZGVvX21wNCZhbXA7cGw9MCZhbXA7cXM9MCZhbXA7cmM9TTJ3N09HeHhaV2RyTXpNek96Y3pNMEFwUEdSb05UUTZaenM3TjJnNU5HbG1abWR4YldKc01WNWlNRjlnTFMweE1UWnpjell6TTE0eE1EVXZOR0l3TFRJek1tRTZZdyUzRCUzRCZhbXA7dmw9JmFtcDt2cj0%3D&name=kenton&id_video=6924022404469640454'
  // const writer = Fs.createWriteStream("videotest.mp4")

  // const response = await Axios({
    // url,
    // method: 'GET',
    // responseType: 'blob',
	// //headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36' }
  // })

  // response.data.pipe(writer)

  // return new Promise((resolve, reject) => {
    // writer.on('finish', resolve)
    // writer.on('error', reject)
  // })
// }

// downloadImage()
const fetch = require('node-fetch');
const fs = require('fs');


async function testing(){
const response = await fetch("https://snaptik.app/dl.php?token=aHR0cHM6Ly92NzcudGlrdG9rY2RuLmNvbS8wN2Q0MjdlZGM1N2M4NmYxZGMwMzQyZTk4MGYwMWRkNi82MDE3YThlNy92aWRlby90b3MvdXNlYXN0MmEvdG9zLXVzZWFzdDJhLXZlLTAwNjhjMDAzLzc1MzdiZWFkMmZlMDQ3MDJhNTNhMWE1ZjFjMjQxMGU4Lz9hPTExODAmYW1wO2JyPTI2ODImYW1wO2J0PTEzNDEmYW1wO2NkPTAlN0MwJTdDMCZhbXA7Y2g9MCZhbXA7Y3I9MCZhbXA7Y3M9MCZhbXA7ZHI9MCZhbXA7ZHM9NiZhbXA7ZXI9JmFtcDtsPTIwMjEwMjAxMDEwODE4MDEwMjM0MDkzMTU4NTgwMDFENTAmYW1wO2xyPSZhbXA7bWltZV90eXBlPXZpZGVvX21wNCZhbXA7cGw9MCZhbXA7cXM9MCZhbXA7cmM9TTJ3N09HeHhaV2RyTXpNek96Y3pNMEFwUEdSb05UUTZaenM3TjJnNU5HbG1abWR4YldKc01WNWlNRjlnTFMweE1UWnpjell6TTE0eE1EVXZOR0l3TFRJek1tRTZZdyUzRCUzRCZhbXA7dmw9JmFtcDt2cj0%3D&name=kenton&id_video=6924022404469640454");
const buffer = await response.buffer();

 fs.writeFile(`name.mp4`, buffer, () => 
   console.log('finished downloading video!')); 
}
testing();

  