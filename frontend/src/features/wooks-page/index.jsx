import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './filters.module.css';
import { FilterBar } from './FilterBar';
import { Header } from '../header/Header';
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Footer } from '../footer';
const wooks = require('../../app-assets/wooks-data-w-index.json');

export const WooksPage = () => {
  const [wooksData, setWooksData] = React.useState(wooks.wooks);
  const [filtersToggled, setFiltersToggled] = React.useState(false);
  const parent = React.useRef(null);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [numColumns, setNumColumns] = React.useState(6);
  const [numRows, setNumRows] = React.useState(6);
  const [height, setHeight] = React.useState(100);
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);

    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  });

  React.useEffect(() => {
    const parentWidth = parent?.current?.offsetWidth;
    const numColumn = Math.floor(parentWidth / 100);
    const remainder = parentWidth % 100;
    const dist = remainder / numColumn;
    const heights = 100 + dist;
    setHeight(heights);
    if (dimensions.width < 601) {
      const parentWidth = parent?.current?.offsetWidth;
      const numColumn = Math.floor(parentWidth / 100);
      setNumColumns(numColumn);
      setNumRows(4);
    } else {
      const parentWidth = parent?.current?.offsetWidth;
      const numColumn = Math.floor(parentWidth / 100);
      setNumColumns(numColumn);
      setNumRows(6);
    }
  }, [dimensions]);
  let history = useHistory();

  const filterData = (filters, and = true) => {
    const newWookSet = [];
    for (let i = 0; i < wooks.wooks.length; i++) {
      const wook = wooks.wooks[i];
      const attributes = Object.values(wook).filter((el) => typeof el === 'string');
      let overlap;
      if (and) {
        overlap = filters.every((filter) => {
          return attributes.includes(filter);
        });
      } else {
        overlap = attributes.some((att) => filters.includes(att));
      }
      if (overlap || filters.length === 0) {
        newWookSet.push(wook);
      }
    }
    setWooksData(newWookSet);
  };

  const COLUMN_WIDTH = 120;

  const Cell = ({ columnIndex, rowIndex, style, data: { data, columns } }) => {
    const itemIndex = rowIndex * (columns + 1) + columnIndex;
    const wookIndex = data[itemIndex]?.index - 1;

    if (!wookIndex && wookIndex !== 0) {
      return null;
    }
    return (
      <div style={style}>
        <img
          onClick={() => history.push(`/wooks/${wookIndex}`)}
          key={wookIndex}
          data-index={wookIndex}
          src={require(`../../../assets/img/wooks/${wookIndex}.gif`)}
        />
      </div>
    );
  };

  const handleClick = () => setFiltersToggled(!filtersToggled);
  const getHeight = () => {
    return height;
  };
  const handleRemoveFilterPill = (sel) => {
    const newSelected = selected.filter((el) => el !== sel);
    setSelected(newSelected);
  };

  return (
    <div className={styles.wooksPageContainer}>
      <Header />
      <div className={styles.filtersContainer}>
        <FilterBar filterData={filterData} toggled={filtersToggled} selected={selected} setSelected={setSelected} />
        <div className={`${styles.filterBg} ${filtersToggled ? styles.showFilter : null}`}>
          <div onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <path
                fillRule="evenodd"
                d="M53.2 10.8C41.5-.9 22.5-.9 10.8 10.8s-11.7 30.7 0 42.4 30.7 11.7 42.4 0 11.7-30.7 0-42.4zm-2.8 2.8c10.1 10.1 10.1 26.6 0 36.8s-26.6 10.1-36.8 0-10.1-26.6 0-36.8 26.6-10.1 36.8 0zM29.2 32l-7.8-7.8c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l7.8 7.8 7.8-7.8c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8L34.8 32l7.8 7.8c.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0L32 34.8l-7.8 7.8c-.8.8-2 .8-2.8 0-.8-.8-.8-2 0-2.8l7.8-7.8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div ref={parent} className={styles.resultsContainer}>
          <div className={styles.filterBtn} onClick={handleClick}>
            <span>Show Filters</span>
          </div>
          <h2>{wooksData.length} Found</h2>
          <div className={styles.filterPills}>
            {selected.map((sel) => {
              return (
                <div className={styles.pill}>
                  <span>{sel}</span>
                  <div onClick={() => handleRemoveFilterPill(sel)}>ⓧ</div>
                </div>
              );
            })}
          </div>
          <div className={styles.wooksResultsContainer}>
            <AutoSizer>
              {({ height, width }) => {
                return (
                  <Grid
                    columnCount={numColumns}
                    columnWidth={getHeight}
                    height={height}
                    itemData={{
                      data: wooksData,
                      columns: Math.floor(width / COLUMN_WIDTH),
                    }}
                    rowCount={Math.ceil(wooksData.length / numColumns)}
                    rowHeight={getHeight}
                    width={width}
                  >
                    {Cell}
                  </Grid>
                );
              }}
            </AutoSizer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
