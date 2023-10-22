import React from 'react';
import styles from './banner.module.css';
export const Banner = () => {
  let images = new Array(25).fill(1);
  images = images.map((_, idx) => {
    return <img key={idx} src={require(`../../../../assets/img/wooks/${idx}.gif`)} className={styles.wookBannerImage}/>
  });
  let tempArr = [];
  const newImages = images.reduce((arr, curr, idx) => {
    if ((idx + 1) % 2 !== 0) {
      tempArr.push(curr);
    } else {
      tempArr.push(curr);
      const pairs = (
        <div>{tempArr}</div>
      )
      arr.push(pairs)
      tempArr = [];
    }
    return arr;
  }, []);
  return (
    <div className={styles.bannerContainer}>
      {newImages}
    </div>
  )
}
