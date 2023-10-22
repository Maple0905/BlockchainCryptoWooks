import React from 'react';
import styles from './connectBar.module.css';
import { ConnectBar } from '../../header/ConnectBar';
import { useWeb3Context } from '../../../provider';

export const ConnectBarHome = () => {
  const { userAddress, connectWallet, isSaleActive } = useWeb3Context();

  return (
    <div className={styles.connectBar}>
      <div className={styles.connectBarInner}>Mint is over!</div>
    </div>
  );
};
