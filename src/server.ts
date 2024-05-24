import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const port = 2423;

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);const __dirname = dirname(__filename);


// Load your SSL certificate and key
const options = {
    key: fs.readFileSync(`${process.env['KEY']}`),
    cert: fs.readFileSync(`${process.env['CERT']}`)
};

const app = express();

app.use(express.static(path.join(__dirname, '/cygnus-visuales')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/cygnus-visuales/index.html'));
});

https.createServer(options, app).listen(process.env['PORT'] , () => {
    console.log(`HTTPS Server running on port ${process.env['PORT']}`);
});
