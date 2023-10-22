import React from 'react';
import styles from './celebs.module.css';
import { Header } from '../header/Header';
import { useWeb3Context } from '../../provider';
import { Footer } from '../footer';
import Web3 from "web3";
import { ethers } from 'ethers';

const Celebs = require('../../app-assets/celebsFiles.json');
const ABI = require('../../contracts/CryptoWooks.json');
const wookAddress = require('../../contracts/contract-address.json');
const freeIndexes = [1, 4, 7, 10, 16, 19, 22, 25, 26, 28, 35, 36, 45, 46, 47, 55, 56, 62, 65, 67, 72, 75, 78, 83, 87, 90, 92, 97, 102, 107,
  112, 117, 118, 120, 121, 122, 126, 127, 128, 130, 131, 133, 140, 141, 145, 146, 148, 149,];
const freeAddresses = [
  '0x1144b0B094Da46957426C11130f433fF9C189350',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x48917eb80290960582CBe0c13c69A559110c6b5c',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xe23dca4a7e181acc8f3ca024f8ba7d439f72e013',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xd8b5f4b33f0fffaf1cbd08e028ed8392578919d9',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x4311E583bb30d9f8d62dd51C465272eDFD2C0aA6',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x4636cB0FD5d035c444478cbAD53985A29DBE6B8A',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xBb54A48c14184D7cD23013aA8f8EC403Db736Fa9',
  '0x48917eb80290960582CBe0c13c69A559110c6b5c',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x4636cB0FD5d035c444478cbAD53985A29DBE6B8A',
  '0x4B24C6971DbfE241b4D3e1BBcB58EF998F6f3b24',
  '0xd8b5f4b33f0fffaf1cbd08e028ed8392578919d9',
  '0x63ba2d89AE1a8C1998cB45637D9047848BaC71a1',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x5dC70A9b884f78Ee030a8c6ad3b3b7dc10Bbe7f4',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x125a0c7b22f49516022f840be50f06182187d84a',
  '0x4311E583bb30d9f8d62dd51C465272eDFD2C0aA6',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x48917eb80290960582CBe0c13c69A559110c6b5c',];
const tierIndexes = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,];

export const CelebsPage = () => {
  const { getCelebsActive } = useWeb3Context();
  const [ celebsActive, setCelebsActive ] = React.useState(false);
  const [soldItems, setSoldItems] = React.useState([]);
  const [reservedItems, setReservedItems] = React.useState([]);
  const [freeItems, setFreeItems] = React.useState([]);

  React.useEffect(async() => {
    (async function () {
      const isActive = await getCelebsActive();
      setCelebsActive(isActive);
    })();

    await init();
  }, []);

  const init = async () => {
    // await window.ethereum.request({ method: 'eth_requestAccounts' });

    const web3 = new Web3(window.ethereum);
    const PixelWooksNFT = new web3.eth.Contract(ABI.abi, wookAddress.Token);

    let fItems = [];
    const free = await PixelWooksNFT.methods.getFreeIndexes().call();
    free.map((item) => { fItems.push(parseInt(item)); });
    setFreeItems(fItems);

    let sItems = [];
    const sold = await PixelWooksNFT.methods.getSoldIndexes().call();
    sold.map((item) => { sItems.push(parseInt(item)); });
    setSoldItems(sItems);

    let rItems = [];
    const reserved = await PixelWooksNFT.methods.getReservedIndexes().call();
    reserved.map((item) => { rItems.push(parseInt(item)); });
    setReservedItems(rItems);
  };

  const BuyWook = async (id) => {

    const web3 = new Web3(window.ethereum);
    let accounts;
    await web3.eth.requestAccounts().then((acc) => { accounts = acc;});
    const PixelWooksNFT = new web3.eth.Contract(ABI.abi, wookAddress.Token);

    let tierIndex = tierIndexes[id] == 1 ? "0.015" : "0.03";
    if (freeIndexes[freeAddresses.indexOf(accounts[0])] == id) tierIndex = "0.0";
    await PixelWooksNFT.methods.mintCelebWook(id).send({value: ethers.utils.parseEther(tierIndex), from: accounts[0]})
      .on("receipt", () => {
        alert("transaction confirmed");
      });

    setSoldItems([...soldItems, id]);
  }

  return (
    <>
      <div className={styles.wooksPageContainer}>
        <Header />
        <div className={styles.celebrityPageInner}>
          <h2 id="top">Celebrity Wooks 👑</h2>
          <p>
            In addition to the 5,000 generated wooks, we couldn’t resist creating a few one-offs of our favorite
            wook-inspired VIPs. We’ll be giving these away once we launch to help promote the project and as a way of
            thanking our supporters. Join our{' '}
            <a href="https://discord.com/invite/JTdvNkXRAZ" target="_blank">
              Discord
            </a>{' '}
            and{' '}
            <a href="https://twitter.com/pixelw00ks" target="_blank">
              Twitter
            </a>{' '}
            to find out when these giveaways are happening.
          </p>

          <div className={styles.celebs}>
            {
              Celebs.celebs.map((file, id) => {
                let free = false, reserved = false, sold = false, status, btnText, btnStyle, tierIndex;
                if (freeItems.includes(id)) free = true;
                if (reservedItems.includes(id)) reserved = true;
                if (soldItems.includes(id)) sold = true;

                tierIndex = tierIndexes[id] == 1 ? ".015 ETH" : ".03 ETH";
                btnText = "BUY | " + tierIndex;
                status = true;

                if (free) {
                  btnText = "REDEEM | 0 ETH";
                  btnStyle = styles.free;
                  status = true;
                }
                if (reserved) {
                  btnText = "RESERVED";
                  btnStyle = styles.reserved;
                  status = false;
                }
                if (sold) {
                  btnText = "SOLD";
                  btnStyle = styles.sold;
                  status = false;
                }

                return (
                  <div className={styles.celebCard}>
                    <img src={require(`../../../assets/img/celebs/${file}`)} />
                    <span>Blue Bear, <br></br></span>
                    <span>Colored Bands</span>
                    <button className={btnStyle} onClick={() => BuyWook(id)} >{ btnText }</button>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
