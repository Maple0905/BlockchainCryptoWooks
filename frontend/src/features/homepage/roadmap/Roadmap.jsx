import React from 'react';
import styles from './roadmap.module.css';

export const Roadmap = () => {
  return (
    <div className={styles.roadmapContainer}>
      <div className={styles.roadmapInner}>
        <div className={styles.roadmapText}>
          <h2>Here's what we're envisioning for the next few months:</h2>
        </div>
        <div className={styles.roadmapDiagram}>
          <div className={styles.roadmapDiagramInner}>
            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                <h4>BUILD A COMMUNITY</h4>
                <p>We're using this free mint to grow an awesome community and get people involved, many in their first NFT project. Come party with us on <a href="https://discord.com/invite/JTdvNkXRAZ" target="_blank">Discord</a></p>
              </div>
            </div>
            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                <h4>CREATE THE JAM DAO</h4>
                <p>A DAO means that you make the rules. Wook holders will gain access to the JamDAO so you'll help decide which artists perform and come up with other amazing ideas.</p>
              </div>
            </div>
            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                <h4>FUND A CONCERT TREASURY</h4>
                <p>
                  The money collected through secondary sales will build a concert venue and Shakedown street in the Metaverse and fund a whole lot of live music.
                </p>
              </div>
            </div>
            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                <h4>FORM A LINE UP</h4>
                <p>
                  We'll start working with musicians to create live shows and artists to put up live visualizations during the concerts.
                </p>
              </div>
            </div>
            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                <h4>OPEN A MERCH STORE</h4>
                <p>
                  A portion of the proceeds from our merch store will go into the concert treasury to continue to fund live music.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
