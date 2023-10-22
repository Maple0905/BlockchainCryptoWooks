import React, { useEffect } from 'react';
import styles from './hero-container.module.css';
import { Card } from './card';

export const HeroContainer = (props) => {
  // rows = 600 / 75
  // cols = width / 75
  const [numWooks, setNumWooks] = React.useState(Math.round((window.innerWidth / 75) * (600 / 75) * 1.2));
  const [images, setImages] = React.useState([]);

  const setNumWooksFn = () => {
    setNumWooks(Math.round((window.innerWidth / 75) * (600 / 75) * 1.2));
  };

  useEffect(() => {
    let images = new Array(numWooks).fill(1);
    images = images.map((_, idx) => {
      return (
        <img key={idx} src={require(`../../../../assets/img/wooks/${idx}.gif`)} className={styles.wookHeroImage} />
      );
    });
    setImages(images);
  }, [numWooks]);

  useEffect(() => {
    window.addEventListener('resize', setNumWooksFn);
    return () => {
      window.removeEventListener('resize', setNumWooksFn);
    };
  });

  return (
    <div className={styles.heroContainer}>
      <div className={styles.imagesContainer}>{images}</div>
      <Card />
    </div>
  );
};
