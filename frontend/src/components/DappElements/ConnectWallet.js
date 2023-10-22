import React from 'react';
import styles from './connectWallet.module.css';
import { NetworkErrorMessage } from './NetworkErrorMessage';

export function ConnectWallet({ connectWallet, networkError, dismiss, userAddress }) {
  return (
    <div className={styles.container}>
      {/* Metamask network should be set to Localhost:8545. */}
      {networkError && <NetworkErrorMessage message={networkError} dismiss={dismiss} />}
      <button className={styles.button} type="button" onClick={connectWallet}>
        {userAddress ? userAddress : 'Connect Wallet'}
      </button>
    </div>
  );
}
