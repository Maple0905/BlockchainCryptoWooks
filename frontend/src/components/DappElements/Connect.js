import React, { useState } from 'react';
import { ConnectWallet } from './ConnectWallet';
import styles from './connect.module.css';
import { checkNetwork } from '../dapp.utils';
import { ethers } from 'ethers';
import contractAddress from '../../contracts/contract-address.json';
import CryptoWooks from '../../contracts/CryptoWooks.json';
export const Connect = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [CWToken, setCWToken] = useState(null);
  const [tokenData, setTokenData] = useState({});
  const [hasEnough, setHasEnough] = useState(null);
  const [signer, setSigner] = useState(null);
  const intializeEthers = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const token = new ethers.Contract(contractAddress.Token, CryptoWooks.abi, provider);
    console.log(token);
    setProvider(provider);
    setCWToken(token);
    const walletSigner = provider.getSigner();
    setSigner(walletSigner);

    let topic = ethers.utils.id('Minted(uint256)');

    let filter = {
      address: contractAddress.Token,
      topics: [topic],
    };

    provider.on(filter, async (result) => {
      console.log('result', result);
    });
  };
  const initialize = async (selectedAddress) => {
    setUserAddress(selectedAddress);
    await intializeEthers();
  };
  const connectWallet = async () => {
    const [selectedAddress] = await window.ethereum.enable();
    // if (!checkNetwork()) {
    //   return;
    // }
    initialize(selectedAddress);
  };

  return (
    <div className={styles.connectWalletContainer}>
      <ConnectWallet connectWallet={connectWallet} userAddress={userAddress} />
    </div>
  );
};
