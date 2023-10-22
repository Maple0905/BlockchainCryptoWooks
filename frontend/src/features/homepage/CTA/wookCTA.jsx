import React from 'react';
import styles from './cta.module.css';
import wook1 from '../../../app-assets/img2/wtf-wook-1.gif';
import wook2 from '../../../app-assets/img2/wtf-wook-2.gif';
import wook3 from '../../../app-assets/img/145.gif';
import { Link } from 'react-router-dom';

export const WookCTA = () => {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaLayout}>
        <div className={styles.ctaWook}>
          <img src={wook1} className={styles.wookBannerImage} />
          <img src={wook2} className={styles.wookBannerImage} />
        </div>
        <div className={styles.textContainer}>
          <h2>WTF is a Wook?!</h2>
          <p>
            If you're unfamiliar with what a wook is that doesn’t mean you can’t join in the fun. The Urban Dictionary
            defines a wook as a dirty, vagrant hippy. Their only job is to follow around jambands and make enough money
            selling drugs, crystals or other merch to make it to the next show. Check out the{' '}
            <a
              href="https://www.villagevoice.com/2021/07/22/inside-the-nitrous-mafia-an-east-coast-hippie-crack-ring/"
              target="_blank"
            >
              Nitrous Mafia
            </a>{' '}
            &nbsp;or&nbsp;
            <a href="https://www.instagram.com/explore/tags/wooksdoingthings/?hl=en" target="_blank">
              #wooksdoingthings
            </a>
            &nbsp;for a better idea.
          </p>
          <Link role="button" className={styles.viewAllWooksBtn} to="/wooks">
            VIEW ALL WOOKS
          </Link>
        </div>
      </div>
    </div>
  );
};
