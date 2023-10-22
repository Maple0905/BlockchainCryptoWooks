import React, { useState } from 'react';
import styles from './accordion.module.css';
import collapse from "../../app-assets/img/collapse.svg";
import expand from "../../app-assets/img/expand.svg";

const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);
  let titleStyles;
  return (
  <div className={styles.accordionItem}>
    <div className={styles.accordionTitle} style={ isActive ? {} : { marginBottom: 0 } } onClick={() => setIsActive(!isActive)}>
      <div>{title}</div>
      <div className={styles.accordionToggle}>
        {
          isActive ?
            <img src={collapse}/> :
            <img src={expand}/>
        }
      </div>
    </div>
    {isActive && <div className="accordion-content">{children}</div>}
  </div>
  );
};

export default Accordion;
