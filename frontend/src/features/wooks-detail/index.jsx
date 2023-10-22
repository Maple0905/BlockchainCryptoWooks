import React from 'react';
import { Header } from '../header/Header';
import { WookDetailHero } from './WookDetailHero';
import { Pagination } from './Pagination';
import { WookBuyRibbon } from './WookBuyRibbon';
import { WookAttributesDetail } from './WookAttributesDetail';
import { WooksDetailTransactions } from './WooksDetailTransactions';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './wooksDetail.module.css';
import { Footer } from '../footer';

export const WooksDetail = () => {
  let history = useHistory();
  let location = useLocation();
  const wookIndex = +location.pathname.split('/')[2];
  return (
    <>
      <div className={styles.wooksPageContainer}>
        <Header />
        <Pagination wookIndex={wookIndex} />
        <div className={styles.wookDetailContainer}>
          <div className={styles.wookDetailLeft}>
            <WookDetailHero wookIndex={wookIndex} />
            <Link className={styles.viewAllWooksBtn} to="/wooks">
              VIEW ALL WOOKS
            </Link>
          </div>
          <div className={styles.wookDetailRight}>
            <WookBuyRibbon wookIndex={wookIndex} />
            <WookAttributesDetail wookIndex={wookIndex} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
