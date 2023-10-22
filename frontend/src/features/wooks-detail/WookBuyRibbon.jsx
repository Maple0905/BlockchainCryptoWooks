import React from 'react';
import styles from "./wooksDetail.module.css";

export const WookBuyRibbon = ({ wookIndex }) => {
  return (
    <div className={styles.wookBuyRibbonContainer}>
      <h2>Wook #{wookIndex}</h2>
    </div>
  )
}
