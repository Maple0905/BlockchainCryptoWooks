import React from 'react';
import styles from './checkbox.module.css';

export const Checkbox = ({ checked = true, onCheck }) => {
  return (
    <label className={styles.checkbox}>
      <input checked={checked} type="checkbox" onChange={(e) => onCheck(e)}/>
    </label>
  )
}
