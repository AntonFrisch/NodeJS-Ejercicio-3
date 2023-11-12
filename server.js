const https = require('https');
const cheerio = require('cheerio');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

function parseData(html) {
    const $ = cheerio.load(html);
    const currentCloseValue = $('fin-streamer[data-symbol="MNMD"][data-test="qsp-price"][data-field="regularMarketPrice"]').text();
    const prevCloseValue = $('[data-test="PREV_CLOSE-value"]').text();
    console.log(`Current Close Value ${currentCloseValue}\nPrevious Close Value: ${prevCloseValue} `);
  }
  

function scrape() {
  const url = 'https://finance.yahoo.com/quote/MNMD/';
  fetchHTML(url)
    .then(parseData)
    .catch(console.error);
}
setInterval(scrape, 5 * 1000);
