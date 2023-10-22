const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const whiteListAddresses = require('./whitelist.json')['addresses']

const leafNodes = whiteListAddresses.map(addr => keccak256(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

const rootHash = merkleTree.getHexRoot();

console.log('---------------------------')
console.log('   Generating Merke Tree')
console.log('---------------------------')
console.log(merkleTree.toString())
console.log(`Root Hash: ${rootHash}`)