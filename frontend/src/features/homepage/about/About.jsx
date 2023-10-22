import React from 'react';
import styles from './about.module.css';
import about1 from '../../../app-assets/img/11.gif';
import about2 from '../../../app-assets/img/542.gif';

export const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutInner}>
        <div className={styles.aboutImages}>
          <img src={about1} />
          <img src={about2} />
        </div>
        <div className={styles.aboutText}>
          <h2 style={{ marginTop: "8px"}}>Our Team</h2>
          <p>
            See those two guys over there? That’s not us. We don’t look like that. But we do have beards.<br/><br/> We’re an
            ambitious and passionate designer + developer team living in the NY area that love hitting up shows together
            when our wives let us. We’ve seen a lot of music over the years, and don’t plan on stopping any time soon.
            We can't wait to catch some shows together in the Metaverse!
            <br /><br/>
            This project is dedicated to the community of people we love seeing at these shows.
          </p>
        </div>
      </div>
    </div>
  );
};
