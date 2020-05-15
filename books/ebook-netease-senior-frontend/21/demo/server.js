const express = require('express');
const fs = require('fs');
const Vue = require('vue');
const server = express();
const renderer = require('vue-server-renderer').createRenderer();

function createApp(url) {
  if (url === '/') {
    url = '/index';
  }
  return new Vue({
    template: fs.readFileSync('template' + url + '.html', 'utf-8')
  });
}

server.get('*', (req, res) => {
  var app = createApp(req.url);
  renderer.renderToString(app).then(html => {
    res.end(html);
  });
});

server.listen(1000);
