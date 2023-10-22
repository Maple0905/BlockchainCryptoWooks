import React from 'react';
import styles from './wooks-mobile.module.css';

export const MobileWooksView = (props) => {
  let images = new Array(60).fill(1);
  images = images.map((_, idx) => {
    return (
      <img key={idx} src={require(`../../../../assets/img/wooks/${idx + 21}.gif`)} className={styles.wookHeroImage} />
    );
  });

  return (
    <div className={styles.wmvContainer}>
      <div className={styles.wmvImages}>{images}</div>
    </div>
  );
};
