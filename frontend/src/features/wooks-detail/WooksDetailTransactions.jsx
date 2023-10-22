import React from 'react';
import styles from './wooksDetail.module.css';
export const WooksDetailTransactions = () => {
  return (
    <div className={styles.wookDetailTransactionsWrapper}>
      <h3>Transaction History</h3>
      <div className={styles.wookDetailTransactionsTableWrapper}>
        <div className={styles.header}>Type</div>
        <div className={styles.header}>From</div>
        <div className={styles.header}>To</div>
        <div className={styles.header}>Amount</div>
        <div className={styles.header}>Date</div>
        <div className={styles.cell}>Offered</div>
        <div className={styles.cell}><a href={null}>0xff70ec</a></div>
        <div className={styles.cell}><a href={null}>0xff70ec</a></div>
        <div className={styles.cell}>0.2 Ξ</div>
        <div className={styles.cell}>April 20, 2021</div>
        <div className={styles.cell}>Bid Withdrawn</div>
        <div className={styles.cell}><a href={null}>0xff70ec</a></div>
        <div className={styles.cell}><a href={null}>0xff70ec</a></div>
        <div className={styles.cell}>0.2 Ξ</div>
        <div className={styles.cell}>April 20, 2021</div>
        <div className={styles.cell}>Sold</div>
        <div className={styles.cell}><a href={null}>0xff70ec</a></div>
        <div className={styles.cell}><a href={null}>0xff70ec</a></div>
        <div className={styles.cell}>0.2 Ξ</div>
        <div className={styles.cell}>April 20, 2021</div>
      </div>
    </div>
  )
}
