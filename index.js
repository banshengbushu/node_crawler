const express = require('express');
const app = express();
const superagent= require('superagent');
const cheerio = require('cheerio');

const server = app.listen(3333, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Your App is running at localhost://%s', host, port);
});

let news = [];

superagent.get('https://www.yuewen.com/#&news').end((err, res) => {
  if (err) {
    console.log(`clawler failed - ${err}`)
  } else {
    const $ = cheerio.load(res.text);

    $('div#brandNavX a').each((id, element) => {
      console.log(element)
      let item = {
        title: $(element).attr('href'),
      };
      news.push(item);
    });
    
    return news;
  }
});

app.get('/', (req, res) => {
  res.send(news);
});

