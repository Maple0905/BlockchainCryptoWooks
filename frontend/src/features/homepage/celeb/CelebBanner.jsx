import React from 'react';
import styles from './celeb-banner.module.css';
import celeb1 from '../../../app-assets/img/phish-rainbow-bands.gif';
import celeb2 from '../../../app-assets/img/trey-colored-stars.gif';
import celeb3 from '../../../app-assets/img/bear-pink-rainbow-squares.gif';
import celeb4 from '../../../app-assets/img/jerry-dancing-1.gif';
import { Link } from 'react-router-dom';

export const CelebBanner = () => {
  return (
    <div className={styles.celebBannerContainer}>
      <div className={styles.celebBannerInner}>
        <div className={styles.celebText}>
          <h2>Celebrity Wooks</h2>
          <p>
            In addition to the 5,000 generated wooks, we couldn’t resist creating a few one-offs of our favorite
            wook-inspired VIPs. We’ll be giving these away once we launch to help promote the project and as a way of
            thanking our supporters. Join our{' '}
            <a href="https://discord.com/invite/JTdvNkXRAZ" target="_blank">
              Discord
            </a>{' '}
            and{' '}
            <a href="https://twitter.com/pixelw00ks" target="_blank">
              Twitter
            </a>{' '}
            to find out when these giveaways are happening.
          </p>
          <Link className={styles.viewCelebs} to="/celebs">
            View All Celebrity Wooks Here
          </Link>
        </div>
        <div className={styles.celebImg}>
          <img src={celeb1} className={styles.celebBannerImage} />
          <img src={celeb2} className={styles.celebBannerImage} />
          <img src={celeb3} className={styles.celebBannerImage} />
          <img src={celeb4} className={styles.celebBannerImage} />
        </div>
      </div>
    </div>
  );
};
