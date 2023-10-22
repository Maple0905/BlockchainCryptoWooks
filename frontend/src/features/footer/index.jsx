import React from 'react';
import { Link } from 'react-router-dom';
import footerIMG from '../../app-assets/img/footer.svg';

import styles from './footer.module.css';
import { SocialLogos } from './social';

export const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContent}>
        <div className={styles.footerInner}>
          <div className={styles.leftFooter}>
            <img src={footerIMG} />
            <span>© 2021 Pixelwooks</span>
          </div>
          <div className={styles.rightFooter}>
            <SocialLogos />
          </div>
        </div>
      </div>
    </footer>
  );
};
