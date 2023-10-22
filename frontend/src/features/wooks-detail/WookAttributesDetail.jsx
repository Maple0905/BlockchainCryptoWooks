import React from 'react';
import { Link } from 'react-router-dom';
import styles from './wooksDetail.module.css';
import { flatNames } from '../../app-assets/flatNames';

const wooks = require('../../app-assets/wooks-data-w-index.json');
const wooksCounts = require('../../app-assets/wooks-attributes-counts.json');
const phishShows = require('../../app-assets/phish-shows.json');
const phishSongs = require('../../app-assets/phish-songs.json');
const lotFood = require('../../app-assets/lot-food.json');

export const WookAttributesDetail = ({ wookIndex }) => {
  const currentWook = wooks.wooks[wookIndex];

  return (
    <div className={styles.wookAttributesDetailContainer}>
      <div className={styles.wookAttributesColumn}>
        <h3>Attributes</h3>
        {Object.keys(currentWook)
          .filter((el) => el !== 'index')
          .map((key) => {
            console.log(key, currentWook);
            const attr = currentWook[key];
            const num = wooksCounts[key][attr];
            return (
              <div className={styles.wookAttributesItem}>
                <span className={styles.attributeType}>{flatNames[key]}</span>
                <span>
                  {num} wooks have {flatNames[attr] ? flatNames[attr] : attr}{' '}
                  {key === 'attributesNumber' && flatNames[key]}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
