const express = require('express');
const path = require('path');
const app = express();
const port = 2323;
const host = '0.0.0.0';

app.use('/videos', express.static('C:/Visuales/Videos'));

app.listen(port, host, () => {
  console.log(`Servidor iniciado en http://${host}:${port}`);
});
