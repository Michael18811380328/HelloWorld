const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.send('test page');
});

app.listen(3000);
