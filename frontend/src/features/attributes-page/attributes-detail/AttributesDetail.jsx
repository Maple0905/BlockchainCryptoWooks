import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './attributeDetail.module.css';
import {Header} from "../../header/Header";
import {AttributesTable} from "../AttributesTable";
const wooks = require('../../../app-assets/wooks-data-w-index.json');

export const AttributeDetail = () => {
  const { id } = useParams();
  return (
  <div className={styles.wooksPageContainer}>
    <Header />
    <div className={styles.wookAttributesContainer}>
      <div className={styles.breadcrumb}>
        <Link to={'/attributes'}>Attributes</Link>
        <span>{id}</span>
      </div>
    </div>
  </div>
  )
}
