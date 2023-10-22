import React from 'react';
import styles from './footer.module.css';
import discord from '../../app-assets/img/discord-logo.png';
import twitter from '../../app-assets/img/twitter-logo.png';
import insta from '../../app-assets/img/insta-logo.png';

export const SocialLogos = () => {
  return (
    <div className={styles.socialLogos}>
      <a href="https://discord.com/invite/JTdvNkXRAZ" target="_blank">
        <img src={discord} />
      </a>
      <a href="https://twitter.com/pixelw00ks/" target="_blank">
        <img src={twitter} />
      </a>
      <a href="https://www.instagram.com/pixelwooks/" target="_blank">
        <img src={insta} />
      </a>
    </div>
  );
};
