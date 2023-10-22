import React from 'react';
import styles from "./wooksDetail.module.css";

export const WookDetailHero = ({wookIndex}) => {
  return (
    <div className={styles.wookDetailHeroContainer}>
        <img key={wookIndex} src={require(`../../../assets/img/wooks/${wookIndex}.gif`)} className={styles.wookHeroImage}/>
    </div>
  )
}
