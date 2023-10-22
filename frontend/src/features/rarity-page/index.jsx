import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import { Header } from '../header/Header';
import { Footer } from '../footer';
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './rarity.module.css';
const scores = require('./scores.json').reverse();
const wookScores = require('./wookScores.json');
const wookScores2 = require('./wookScores2.json');

const wooks = require('../../app-assets/wooks-data-w-index.json')['wooks'];
const trans = Object.keys(wookScores).reduce((acc, curr) => {
  const newObj = {};
  newObj.index = curr - 1;
  newObj.score = wookScores[curr];
  acc.push(newObj);
  return acc;
}, []);

const sorted = sortBy(trans, 'score');

const trans2 = sorted.reverse().map((wook, idx) => {
  const newWook = { ...wook, rank: idx };
  return newWook;
});

const Cell = ({ columnIndex, rowIndex, style, data: { data, columns } }) => {
  const wookIndex = data[rowIndex].index;

  return (
    <div style={style} className={styles.wookRow}>
      <span># {data[rowIndex].rank}</span>
      <span>{wookIndex}</span>
      <span>{data[rowIndex].score.toFixed(4)}</span>
      <img key={wookIndex} data-index={wookIndex} src={require(`../../../assets/img/wooks/${wookIndex}.gif`)} />
    </div>
  );
};
export const RarityPage = () => {
  const [search, setSearch] = React.useState('');
  const [filteredWooks, setfilteredWooks] = React.useState(trans2);
  const [sort, setSort] = React.useState(null);

  useEffect(() => {
    const filtered = trans2.filter((wook) => {
      if (search.length === 0) {
        return true;
      }
      if (wook.index === +search) {
        return true;
      }
      return false;
    });
    setfilteredWooks(filtered);
    console.log(filtered);
  }, [search]);

  const handleSearch = (val) => {
    setSearch(val);
  };

  const handleSort = () => {
    if (sort === 'asc') {
      const sorted = sortBy(filteredWooks, 'index').reverse();
      setfilteredWooks(sorted);
      setSort('desc');
    } else if (sort === 'desc') {
      const sorted = sortBy(filteredWooks, 'score').reverse();
      setfilteredWooks(sorted);
      setSort(null);
    } else {
      const sorted = sortBy(filteredWooks, 'index');
      setfilteredWooks(sorted);
      setSort('asc');
    }
  };

  return (
    <div className={styles.wooksPageContainer}>
      <Header />
      <div className={styles.tableHeaderContainer}>
        <h3>Wooks Rarity Scores (desc)</h3>
        <div className={styles.tableheader}>
          <span>Rank</span>
          <div className={styles.wookSort} onClick={handleSort}>
            <span>Wook #</span>
            {sort && <div>{sort === 'asc' ? '▲' : '▼'}</div>}
          </div>
          <span>Score</span>
          <div className={styles.input}>
            <input
              placeholder="Search Wook #"
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
      </div>

      <div className={styles.wookDetailContainer}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <Grid
                columnCount={1}
                columnWidth={() => 500}
                height={height}
                itemData={{
                  data: filteredWooks,
                  columns: Math.floor(width / 200),
                }}
                rowCount={Math.ceil(filteredWooks.length / 2)}
                rowHeight={() => 150}
                width={width}
              >
                {Cell}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>
      <Footer />
    </div>
  );
};
