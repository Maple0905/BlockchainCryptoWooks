import React from 'react';
import {Header} from "../header/Header";
import styles from './community.module.css';
import { Dapp } from '../../components/Dapp';
import { CommunitySectionBanner } from './community-section';

export const CommunityPage = () => {
  return (
  <div className={styles.communityContainer}>
    <Header />
    <div className={styles.communityContainer}>
    </div>
    <CommunitySectionBanner/>
    <div className={styles.communityMintSection}>
      <div className={styles.communityMintSectionInner}>
        <h2>Check Eligibility</h2>
        <Dapp/>
      </div>
    </div>
    </div>
  )
}
