import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import previous from '../../app-assets/img/previous.svg';
import next from '../../app-assets/img/next.svg';
import styles from '../wooks-detail/wooksDetail.module.css';
const wooks = require('../../app-assets/wooks-data-w-index.json');

export const Pagination = ({ wookIndex }) => {
  let leftDisabled = false;
  let rightDisabled = false;
  if (wookIndex - 1 < 0) {
    leftDisabled = true;
  }
  if (wookIndex > wooks.wooks.length - 2) {
    rightDisabled = true;
  }
  return (
    <div className={styles.paginationContainer}>
      <Link
        to={!leftDisabled && `/wooks/${wookIndex - 1}`}
        disabled={leftDisabled}
        className={`${styles.paginationButton} ${leftDisabled ? styles.disabled : null}`}
      >
        <img src={previous} />
        <span>Previous Wook</span>
      </Link>
      <Link
        to={!rightDisabled && `/wooks/${wookIndex + 1}`}
        disabled={rightDisabled}
        className={`${styles.paginationButton} ${rightDisabled ? styles.disabled : null}`}
      >
        <div className={styles.paginationButton}>
          <span>Next Wook</span>
          <img src={next} />
        </div>
      </Link>
    </div>
  );
};
