import React, { useEffect, useState } from 'react';
import styles from './mint-info.module.css';
import { useWeb3Context } from '../../../provider';

export const MintInfo = () => {
  const { userAddress, connectWallet, checkIfEligible, isSaleActive } = useWeb3Context();

  return (
    <div className={styles.mintInfoContainer}>
      <div className={styles.mintInfoContainerInner}>
        <div className={styles.mintCard}>
          <div className={styles.textContainer}>
            <h2>Community Grants</h2>
            <p>
              We want to give back to the communities that we are part of and that have inspired us. We’ll be giving
              away 2,000 wooks to some select project holders. More info on this to come soon! <br />
              <br />
              Additionally, 5% from every sale will be donated to{' '}
              <a href="https://mbird.org/" target="_blank" style={{ color: '#E7038D' }}>
                The Mockingbird Foundation
              </a>
            </p>
            {/*{!userAddress && <span>Connect your wallet below</span>}*/}
          </div>
          {/*<div className={styles.buttonContainer}>*/}
          {/*  <button*/}
          {/*    onClick={() =>*/}
          {/*      checkIfEligible().then((resp) =>*/}
          {/*        alert(resp ? 'You are eligible for a freebie!' : 'Sorry, you are not eligible.')*/}
          {/*      )*/}
          {/*    }*/}
          {/*    disabled={!userAddress}*/}
          {/*  >*/}
          {/*    CHECK ELIGIBILITY*/}
          {/*  </button>*/}
          {/*  <button disabled={!isSaleActive}>CLAIM A WOOK</button>*/}
          {/*</div>*/}
        </div>
        <div className={styles.mintCard}>
          <div className={styles.textContainer}>
            <h2>Mint a Wook</h2>
            <p>
              We're selling the other 8,000 wooks for 0.0420 ETH. Every wook is created by a random algorithm which
              ensures that each one is different from the others. They’ll be dropping at 4:20pm EST on April 20, 2022.
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button disabled={!isSaleActive}>MINT A WOOK</button>
          </div>
        </div>
      </div>
    </div>
  );
};
