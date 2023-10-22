import React from 'react';
import Accordion from './accordion';
import { Checkbox } from './Checkbox';
import styles from './filters.module.css';
import { flatNames } from '../../app-assets/flatNames';

const wooksCounts = require('../../app-assets/wooks-attributes-counts.json');

const allAttributes = Object.values(wooksCounts)
  .map((cat) => Object.keys(cat))
  .flat();

export const FilterBar = ({ filterData, toggled, selected, setSelected }) => {
  const [combo, setCombo] = React.useState(false);
  React.useEffect(() => {
    filterData(selected, true);
  }, [selected]);

  const toggleItem = (attribute) => {
    const selectedHasItem = selected.includes(attribute);
    if (selectedHasItem) {
      setSelected(selected.filter((el) => el !== attribute));
    } else {
      setSelected([...selected, attribute]);
    }
  };

  const bulkSelect = (type) => {
    if (type === 'all') {
      setSelected(allAttributes);
    } else {
      setSelected([]);
    }
  };

  const getIsChecked = (att) => {
    return selected.includes(att);
  };

  const handleCombo = () => {
    setCombo(!combo);
  };

  return (
    <div className={`${styles.filterBarContainer} ${toggled ? styles.toggled : null}`}>
      <div className={styles.filterHeader}>
        <span className={styles.filterTitle}>filters</span>
      </div>
      {Object.keys(wooksCounts).map((category) => {
        return (
          <div key={category} className={styles.filterCategory}>
            <Accordion title={flatNames[category]}>
              {Object.keys(wooksCounts[category]).map((attribute, idx) => {
                return (
                  <div key={`${attribute}-${idx}`} className={styles.filterItem}>
                    <Checkbox onCheck={() => toggleItem(attribute)} checked={getIsChecked(attribute)} />
                    <span>{flatNames[attribute]}</span>
                    <span>&nbsp;({wooksCounts[category][attribute]})</span>
                  </div>
                );
              })}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};
