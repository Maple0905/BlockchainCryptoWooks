import React from 'react';
import styles from './cta.module.css';

export const CTA = ({ title, text }) => {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <p
        dangerouslySetInnerHTML={{
          __html: text
        }}>
        </p>
      </div>
    </div>
  )
}
