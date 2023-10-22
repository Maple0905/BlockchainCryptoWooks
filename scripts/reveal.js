async function main() {
  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log('Deploying the contracts with the account:', await deployer.getAddress());
  console.log(__dirname);

  console.log(`Account: ${deployer.address}`);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  // get deployed contract
  const PixelWook = await ethers.getContractAt('PixelWooks', '0x156B05B48625ab11777c79d1B860c89D72cF9A3D', deployer);
  console.log('Wook address:', await PixelWook.address);
  // Placeholder
  //   const tx = await PixelWook.reveal('ipfs://QmWMtFkpgRJ9rfXj9UqnDgT3gHMhdNEVCq2BvrS5aSadKK/');

  const tx = await PixelWook.reveal('ipfs://QmNjvy2Sh8yUvSmW7jfPQo3MU9WRNCZ8iwbaYEmXFnV7Ca/');
  await tx.wait();
  console.log(tx);
  console.log('Reveal succeseful');
}

main();

//npx hardhat run scripts/reveal.js --network mainnet
