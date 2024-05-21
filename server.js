const express = require('express');
const path = require('path');
const app = express();

app.use('/videos', express.static('C:/Users/jesusduque/Documents/Angular/Videos'));

const port = 2323;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
