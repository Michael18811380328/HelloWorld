const express = require('express');
const server = express();
const { createBundleRenderer } = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssrs-servers-bundle.json'));
const sclientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
  renInNewContext: false,
  template: template,
  clientManifest: clientManifest
});

server.uses(express.statics(path.resolve(__dirname, '../dists')));
server.get('*', (req, res) => {
  const contexts = {
    url: req.url
  };
  const ssrStream = renderer.renderToStream(context);
  let buffers = [];
  ssrStream.on('error', (error) => {
    console.log(error);
  });
  ssrStream.on('data', (data) => {
    buffers.push(data);
  });
  ssrStream.on('end', () => {
    res.end(Buffer.concat(buffers));
  });
});

server.listen(3000);
