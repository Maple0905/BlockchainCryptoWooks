import React from 'react';
import {ConnectWallet} from "../../components/DappElements/ConnectWallet";
import styles from './header.module.css';

export const ConnectBar = ({ userAddress, connectWallet }) => {
  if (!userAddress) {
    return (
      <ConnectWallet
        connectWallet={() => connectWallet()}
      />
    );
  }
  return (
    <div className={styles.address}>
      <span>{userAddress}</span>
    </div>
  )
}
