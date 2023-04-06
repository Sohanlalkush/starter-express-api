const express = require('express');

const https = require('https');

const app = express();

const port = 3000;

// Set CORS headers

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();

});

// Handle preflight request

app.options('*', (req, res) => {

  res.sendStatus(204);

});

// Handle POST request

app.post('/', (req, res) => {

  let body = '';

  req.on('data', (chunk) => {

    body += chunk;

  });

  req.on('end', () => {

    try {

      const payload = JSON.parse(body);

      const options = {

        method: 'POST',

        headers: {

          'Authorization': 'Bearer pk-aMWiVVdxaVYluEFHbslyKQEuHPNeNZZIzCRzXhuOAhMJopsP',

          'Content-Type': 'application/json'

        }

      };

      const apiUrl = 'https://api.pawan.krd/v1/completions';

      const apiReq = https.request(apiUrl, options, (apiRes) => {

        let apiData = '';

        apiRes.on('data', (chunk) => {

          apiData += chunk;

        });

        apiRes.on('end', () => {

          res.setHeader('Content-Type', 'application/json');

          res.end(apiData);

        });

      });

      apiReq.on('error', (error) => {

        console.error(error);

        res.statusCode = 500;

        res.end();

      });

      apiReq.write(JSON.stringify(payload));

      apiReq.end();

    } catch (error) {

      console.error(error);

      res.statusCode = 400;

      res.end();

    }

  });

});

// Handle all other requests

app.all('*', (req, res) => {

  res.status(404).end();

});

// Start server

app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);

});

