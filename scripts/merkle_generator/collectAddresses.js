const fs = require('fs');
const util = require('util')
const fs_writeFile = util.promisify(fs.writeFile)

const erc721ABI = [
    'function ownerOf(uint256 tokenId) external view returns (address)',
    'function totalSupply() external view returns (uint256)'
]

const nftContracts = [
    '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', //bayc
    '0x60E4d786628Fea6478F785A6d7e704777c86a7c6'  //mayc
]


async function getOwners(contractAddress) {
    //let contract = new hre.ethers.Contract(contractAddress, erc721ABI);
    const contract = await hre.ethers.getContractAt(erc721ABI, contractAddress);
    
    const totalSupply = await contract.totalSupply();

    let addresses = new Set()
    for (let i=0; i < totalSupply; i++) {
        if (i < 10) {
            let ownerAddress = await contract.ownerOf(i);
            addresses.add(ownerAddress);
        }
    }
    return addresses
}


async function main() {
    let mergedAddresses = new Set();
    for (let address of nftContracts) {
        let addresses = await getOwners(address);
        addresses.forEach(elem => mergedAddresses.add(elem));
    }

    let whiteListAddresses = JSON.stringify({'addresses': Array.from(mergedAddresses)}, null, 2);
    await fs_writeFile('whitelist.json', whiteListAddresses);
}

main()
  .then(() => process.exit())
  .catch((error) => {
      console.error(error);
      process.exit(1);
  })

