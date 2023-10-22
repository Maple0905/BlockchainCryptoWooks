import React from 'react';
import styles from './howTo.module.css';
import MetaMaskLogo from '../../../app-assets/img2/1-metamask.png';
import EthLogo from '../../../app-assets/img2/2-eth.png';
import Wook from '../../../app-assets/img2/3-wook.gif';

export const HowTo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <h2>How to Get a Wook</h2>
                    <p>
                        It might sound confusing if you're new to this, but it's really not that hard. Just follow these 3 easy
                        steps.
                    </p>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.metamask}>
                        <img src={MetaMaskLogo} />
                        <h4>GET A METAMASK WALLET</h4>
                        <p>This allows you to safely buy NFTs from other websites and store them in your wallet</p>
                        <a href="https://metamask.io/download/" target="_blank">
                            DOWNLOAD METAMASK
                        </a>
                    </div>
                    <div className={styles.ethereum}>
                        <img src={EthLogo} />

                        <h4>BUY ETHEREUM</h4>
                        <p>
                            You can buy Ethereum through{' '}
                            <a href="https://www.coinbase.com/" target="_blank">
                                Coinbase
                            </a>{' '}
                            and store it in your Metamask wallet. Wooks are free but you still need to pay a small amount (~$10) for{' '}
                            <a href="https://ethereum.org/en/developers/docs/gas/" target="_blank">
                                gas
                            </a>
                            .
                        </p>
                    </div>
                    <div className={styles.wook}>
                        <img src={Wook} />

                        <h4>MINT A WOOK</h4>
                        <p>
                            Now using your MetaMask wallet, come back to this site at 4:20pm on April 20th and you will be able to
                            claim your very own wook!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
