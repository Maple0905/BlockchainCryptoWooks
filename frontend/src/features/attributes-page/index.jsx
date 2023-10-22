import React from 'react';
import { AttributesTable } from './AttributesTable';
import styles from './attributes.module.css';
import {Header} from "../header/Header";


export const AttributesPage = () => {
  return (
  <div className={styles.wooksPageContainer}>
    <Header />
    <div className={styles.wookAttributesContainer}>
        <AttributesTable />
    </div>
  </div>
  )
}
