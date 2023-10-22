import React, { useEffect, useState } from 'react';
import styles from './perks.module.css';
import lighter from '../../../app-assets/img/lighter.gif';
import { SocialLogos } from '../../footer/social';

export const Perks = () => {
  return (
    <div className={styles.perksContainer}>
      <div className={styles.perksInner}>
        <div className={styles.perksContent}>
          <div className={styles.perksLeft}>
            <img src={lighter} className={styles.wookBannerImage} />
          </div>
          <div className={styles.perksRight}>
            <h2>We're bringing live music to the Metaverse</h2>
            <ul>
              <li>
                <strong>The Concert Treasury: </strong>
                25% of all proceeds will fund the concert treasury. Not only will this put a sick venue in Decentraland,
                but it will fund a whole lot of live music
              </li>
              <li>
                <strong>Experimentation is Key: </strong> We'll push the envelope with interesting formats, genre
                crossover jams, super groups and lots of general weirdness
              </li>
              <li>
                <strong>The JamDAO: </strong> Wook holders will gain access to the JamDAO so you will help decide which
                artists perform and come up with other amazing ideas
              </li>
              <li>
                <strong>$WOOK Token: </strong>This will be the governance token for JamDAO and all Wook holders will be
                airdropped tokens for voting rights. Users who attend shows and are active in our Discord will also be
                rewarded. Liquidity will be bootstrapped from a portion of NFT sale proceeds.
              </li>
              <li>
                <strong>The Line Up: </strong>We'll be hosting amazing VJs and Touch Designer artists to put up live art
                and music visualizations during concerts. We will capture the best moments as NFTs that only Wook
                holders can have the right to purchase.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
