import React from 'react';
import styles from './community-section.module.css';

export const CommunitySectionBanner = () => {
  return (
  <div className={styles.communitySectionContainer}>
    <div className={styles.communitySectionInner}>
      <div className={styles.communitySectionText}>
        <h2>Community Grants</h2>
        <p>We want to give back to our communities! We are proud punks, meebs and XXXXXX and want to hook up our brethren with some of these dope ass wooks. </p>
        <ul>
          <li>We are giving away 2,000! Its a fair distro so you have just as good of a chance of gettings some rare bois as a paid mint.</li>
          <li>One freebie per wallet. Even if you hold punks, meebs and XXXX, you can only get one.</li>
          <li>First come first serve. So if 2,000 meebs get here first, the rest of you are shit out of luck.</li>
        </ul>
      </div>
    </div>
  </div>
  )
}
