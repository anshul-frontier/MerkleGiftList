const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  
  //create merkle tree 
  const merkleTree = new MerkleTree(niceList); 
  const name = "Martin Bergnaum";
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof, 
    name: name
  });

  console.log(gift);
}

main();