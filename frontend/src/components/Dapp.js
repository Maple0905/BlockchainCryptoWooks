import React, { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import CryptoWooks from '../contracts/CryptoWooks.json';
import contractAddress from '../contracts/contract-address.json';
import { NoWalletDetected } from './DappElements/NoWalletDetected';
import { ConnectWallet } from './DappElements/ConnectWallet';
import { Loading } from './DappElements/Loading';
import { Transfer } from './DappElements/Transfer';
import { TransactionErrorMessage } from './DappElements/TransactionErrorMessage';
import { WaitingForTransactionMessage } from './DappElements/WaitingForTransactionMessage';
import { NoTokensMessage } from './DappElements/NoTokensMessage';
import { checkNetwork } from './dapp.utils';
import styles from './dapp.module.css';

export const Dapp = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [CWToken, setCWToken] = useState(null);
  const [tokenData, setTokenData] = useState({});
  const [hasEnough, setHasEnough] = useState(null);
  const [signer, setSigner] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const connectWallet = async () => {
    const [selectedAddress] = await window.ethereum.enable();
    // if (!checkNetwork()) {
    //   return;
    // }
    initialize(selectedAddress);
  };

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
    let eligible = ethers.utils.id('Eligible(string)');

    let filter = {
      address: contractAddress.Token,
      topics: [eligible],
    };

    provider.on(filter, async (result) => {
      console.log('result', result);
    });
  };

  // const getTokenData = async () => {
  //     const name = await CWToken?.getNFTName();
  //     console.log(CWToken);
  //     const symbol = await CWToken?.getNFTSymbol();
  //     setTokenData({ name, symbol });
  // }

  const startSale = async () => {
    const cwSigner = CWToken?.connect(signer);
    await cwSigner?.flipSaleState();
  };

  const mintNFT = async () => {
    const cwSigner = CWToken?.connect(signer);
    const tx = {
      value: ethers.utils.parseEther('0.042'),
    };
    const gas = await CWToken.estimateGas.mintWook(1, tx);
    console.log('GAS', gas.toNumber());
    await cwSigner?.mintWook(1, tx);
  };

  const mintVFCommunity = async () => {
    const cwSigner = CWToken?.connect(signer);
    const tx = {
      value: ethers.utils.parseEther('0'),
    };
    try {
      await cwSigner?.mintCommunityWook(tx);
    } catch (err) {
      // error.reason - The Revert reason; this is what you probably care about. :)
      // Additionally:
      // - error.address - the contract address
      // - error.args - [ BigNumber(1), BigNumber(2), BigNumber(3) ] in this case
      // - error.method - "someMethod()" in this case
      // - error.errorSignature - "Error(string)" (the EIP 838 sighash; supports future custom errors)
      // - error.errorArgs - The arguments passed into the error (more relevant post EIP 838 custom errors)
      // - error.transaction - The call transaction used
      console.log(err);
      alert(
        err.data.message ===
          "Error: VM Exception while processing transaction: reverted with reason string 'Does not own the NFT'"
          ? 'User does not own a VeeFriend'
          : 'Unknown error'
      );
    }
  };

  const checkIfEligible = async () => {
    const cwSigner = CWToken?.connect(signer);
    try {
      const owns = await cwSigner?.checkUserOwnsNFT();
      const grant = await cwSigner?.checkIfUserReceivedGrant();
      return owns === 1 && grant;
      console.log('OWNS', owns.toNumber());
      console.log('GRANT', grant);
    } catch (err) {
      console.log(err);
      alert(err.data.message);
    }
  };

  const mintBACommunity = async () => {
    const cwSigner = CWToken?.connect(signer);
    const tx = {
      value: ethers.utils.parseEther('0'),
    };

    await cwSigner?.mintCommunityBAWook(tx);
  };

  const getBalance = async () => {
    const balance = await CWToken?.balanceOf(userAddress);
    alert(balance);
  };

  const getMetadata = async () => {
    console.log(userAddress, CWToken);
    const balance = await CWToken?.balanceOf(userAddress);
    const lastIndex = balance - 1 + 2000;
    let tokenURI = await CWToken?.tokenURI(lastIndex);
    console.log('tokenURI', tokenURI);
    tokenURI = tokenURI.replace(/(^\w+:|^)\/\//, '');
    console.log('tokenUI', tokenURI);
    const url = `https://ipfs.io/ipfs/${tokenURI}`;
    console.log(url);
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    console.log('Data', data);
    setMetadata(data);
  };

  const reveal = async () => {
    const cwSigner = CWToken?.connect(signer);
    await cwSigner?.reveal();
  };
  const setBaseURI = async () => {
    const cwSigner = CWToken?.connect(signer);
    await cwSigner?.setBaseURI('ipfs://QmVGeuipVWgsCNzTvXHx8c1xFSbSvYKVgZZuAxBG71X73g/');
  };
  // const setBaseURI = () => CWToken?.setBaseURI("ipfs://QmVGeuipVWgsCNzTvXHx8c1xFSbSvYKVgZZuAxBG71X73g/");

  const initialize = async (selectedAddress) => {
    setUserAddress(selectedAddress);
    await intializeEthers();
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    console.log(CWToken, 'cw token changed');
    // getTokenData();
  }, [CWToken]);

  if (!userAddress) {
    return <ConnectWallet connectWallet={() => connectWallet()} />;
  }

  return (
    <div>
      <h1>DAPP</h1>
      <div className={styles.tokenData}>
        {tokenData?.name && (
          <>
            <span>{tokenData.name}</span>
            <span>{tokenData?.symbol}</span>
            <span>{hasEnough?._hex}</span>
          </>
        )}
        <button onClick={() => startSale()}>Start Sale</button>

        <button onClick={() => mintNFT()}>MINT NFT</button>
        <button onClick={() => mintVFCommunity()}>MINT VF COMMUNITY NFT</button>
        <button onClick={() => checkIfEligible()}>Check if eligible</button>
        <button onClick={() => reveal()}>Reveal</button>
        <button onClick={() => setBaseURI()}>set base uri</button>

        <button onClick={() => getBalance()}>getBalance</button>
        <button onClick={() => getMetadata()}>getMetadata</button>
      </div>
      <div className={styles.metadata}>
        <div className={styles.metadataItem}>
          {metadata &&
            Object.keys(metadata)?.map((el) => {
              console.log(metadata, el);
              if (el === 'name') {
                return <span>{metadata[el]}</span>;
              }
              if (el === 'image') {
                return <img src={metadata[el]} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Dapp;
