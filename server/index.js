const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  const body = req.body;

  const leaf = body.name;
  const proof = body.proof;

  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);
  if(isInTheList) {
    res.send(`${leaf} is in the gift list`);
  }
  else {
    res.send("You are not on the gift list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
