import React, { useEffect, useState, useCallback } from 'react';
import { checkNetwork } from '../components/dapp.utils';
import { ethers } from 'ethers';
import contractAddress from '../contracts/contract-address.json';
import PixelWooks from '../artifacts/contracts/pixelwooks.sol/PixelWooks';

export const Web3Context = React.createContext({
  userAddress: null,
});

export const Web3Provider = (props) => {
  const [userAddress, setUserAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [CWToken, setCWToken] = useState(null);
  const [tokenData, setTokenData] = useState({});
  const [signer, setSigner] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [connectedContract, setConnectedContract] = useState(null);
  const [isSaleActive, setIsSaleActive] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [currentTokenId, setCurrentTokenId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    console.log(CWToken, signer);
    (async function () {
      if (CWToken && signer) {
        const cwSigner = CWToken?.connect(signer);
        const active = await cwSigner?.saleIsActive();
        console.log('active', active);
        setIsSaleActive(active);
        setConnectedContract(cwSigner);
      }
    })();
  }, [CWToken, signer]);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('Must connect to wallet on the Metamask app browser');
      return;
    }
    const [selectedAddress] = await window.ethereum.enable();
    // if (!checkNetwork()) {
    //   return;
    // }
    initialize(selectedAddress);
  });

  const intializeEthers = async () => {
    if (!window.ethereum) {
      alert('Must connect to wallet on the Metamask app browser');
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const token = new ethers.Contract(contractAddress.token, PixelWooks.abi, provider);
    setProvider(provider);
    setCWToken(token);
    const walletSigner = provider.getSigner();
    setSigner(walletSigner);

    const [selectedAddress] = await window.ethereum.enable();
    // if (!checkNetwork()) {
    //   return;
    // }
    console.log(userAddress, selectedAddress);
    if (!userAddress) {
      setUserAddress(selectedAddress);
    }
    let topic = ethers.utils.id('Minted(uint256)');

    let filter = {
      address: contractAddress.token,
      topics: [topic],
    };

    // provider.on(filter, async (result) => {
    //   console.log('result', result);
    //   setTransactionInProgress(false);
    //   setIsSuccess(true);
    // });
  };

  const getCurrentTokenID = async () => {
    const id = await CWToken?.currentTokenId();
    return id;
  };

  const mintNFT = async (number) => {
    const tx = {
      value: ethers.utils.parseEther('0.0'),
    };
    console.log(number);
    try {
      await connectedContract?.mintWook(number);
      setTransactionInProgress(true);
    } catch (err) {
      if (err.error.message === 'execution reverted: MaxMint') {
        alert('Error: You have already minted 10 wooks');
      } else if (err.error.message === 'execution reverted: MaxSupply') {
        alert('Error: Not enough wooks left!');
      } else {
        alert(`Error: ${err.error.message}`);
      }
    }
  };

  const getBalance = async () => {
    return await CWToken?.balanceOf(userAddress);
  };

  const getMetadata = async () => {
    const balance = await CWToken?.balanceOf(userAddress);
    const lastIndex = balance - 1 + 2000;
    let tokenURI = await CWToken?.tokenURI(lastIndex);
    tokenURI = tokenURI.replace(/(^\w+:|^)\/\//, '');
    const url = `https://ipfs.io/ipfs/${tokenURI}`;
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    setMetadata(data);
  };

  const reveal = async () => {
    await connectedContract?.reveal();
  };

  const getCelebsActive = async () => {
    return await connectedContract?.celebsActive();
  };

  const initialize = async (selectedAddress) => {
    console.log(selectedAddress, 'sa');
    setUserAddress(selectedAddress);
    await intializeEthers();
  };

  useEffect(() => {
    console.log(CWToken, 'cw token changed');
    // getTokenData();
  }, [CWToken]);

  return (
    <Web3Context.Provider
      value={{
        userAddress,
        provider,
        CWToken,
        tokenData,
        signer,
        metadata,
        connectWallet,
        mintNFT,
        getBalance,
        getMetadata,
        reveal,
        getCelebsActive,
        isSaleActive,
        connectedContract,
        transactionInProgress,
        getCurrentTokenID,
        isSuccess,
      }}
      {...props}
    />
  );
};

export const useWeb3Context = () => {
  const context = React.useContext(Web3Context);
  if (context === undefined) {
    throw new Error(`useWeb3Context() must be used within an <Web3Provider />`);
  }
  return context;
};
