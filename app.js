const express = require('express');
const app = express();
const { expressjwt: jwt } = require('express-jwt');
const { readFileSync } = require('fs');

const fileName = './public-key.pem';
const contents = readFileSync(fileName, 'utf-8');

app.get(
  "/protected",
  jwt({ secret: contents, algorithms: ["RS256"] }),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.send('Hello World!');
  }
);
console.log('Listening')
app.listen(6666);

