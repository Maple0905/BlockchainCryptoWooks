import React from 'react';
import styles from './attributes.module.css';
import {useHistory} from "react-router-dom";
const attributesTable = require('../../app-assets/attributesTableWithExamples.json');

export const AttributesTable = () => {
  let history = useHistory();

  return (
    <div className={styles.wookAttributesTransactionsWrapper}>
      <h3>Attributes</h3>
      <div className={styles.wookAttributesTransactionsTableWrapper}>
        <div className={styles.headerRow}>
          <div className={styles.header}>Attribute</div>
          <div className={styles.header}>Number</div>
          <div className={styles.header}>Available</div>
          <div className={styles.header}>Examples</div>
        </div>
        {
          attributesTable.map((row) => {
            return (
              <div className={styles.row}>
                <div className={styles.cell}><a href={`/attributes/${row.attribute}`}>{row.attribute}</a></div>
                <div className={styles.cell}>{row.number}</div>
                <div className={styles.cell}>{row.available}</div>
                <div className={styles.cell}>
                  {
                    row.examples.map((index) => {
                      return <img title={`Wook #${index}`} onClick={() => history.push(`/wooks/${index}`)} key={index} src={require(`../../../assets/img/wooks/${index}.gif`)} className={styles.attributeExampleImage}/>
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
