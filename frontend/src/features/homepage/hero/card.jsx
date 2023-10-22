import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './card.module.css';
import logo from '../../../app-assets/img2/logo.png';
import dude from '../../../app-assets/img/about-us-1.svg';
import { SocialLogos } from '../../footer/social';
import discord from '../../../app-assets/img/white-discord.png';

function zeroPad(val) {
  if (val < 10) {
    return '0' + val.toString();
  }
  return val.toString();
}

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  if (hours < 0 && days < 0 && minutes < 0) {
    return null;
  }
  return {
    days: zeroPad(days),
    hours: zeroPad(hours),
    minutes: zeroPad(minutes),
  };
}

const deadline = '2022-04-20T16:20:00';

export const Card = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(deadline));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(deadline));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.cardContainer}>
      <div className={styles.mobileDiscordBanner}>
        <a href="https://discord.com/invite/JTdvNkXRAZ" target="_blank">
          <img src={discord} />
          <span>COME RAGE WITH US ON DISCORD</span>
        </a>
      </div>
      <div className={styles.card}>
        <div className={styles.social}>
          <SocialLogos />
        </div>
        <img src={dude} />
        <img className={styles.pixelLogo} src={logo} />
        <h3 style={{ textAlign: 'center' }}>A FREE NFT Project to Bring Live Music to the Metaverse</h3>
        <p>
          Sup bruh! We're building a community to bring experimental music concerts and performance art to the
          Metaverse. 🤯
          <br />
          Ownership of a wook is your ticket in. So whether you're an NFT hunter or this is your first NFT experience,
          come join the party!
        </p>
        {timeLeft && (
          <div className={styles.countdownContainer}>
            <div className={styles.countdownDigitsContainer}>
              <span className={styles.digitTitle}>DAYS</span>
              <div className={styles.countdownDigitsContainerInner}>
                <div className={styles.digitContainer}>
                  <div className={styles.digit}>
                    <span>{timeLeft.days.split('')[0]}</span>
                  </div>
                  <div className={styles.digit}>
                    <span>{timeLeft.days.split('')[1]}</span>
                  </div>
                </div>
                <span className={styles.colon}>:</span>
              </div>
            </div>
            <div className={styles.countdownDigitsContainer}>
              <span className={styles.digitTitle}>HOURS</span>
              <div className={styles.countdownDigitsContainerInner}>
                <div className={styles.digitContainer}>
                  <div className={styles.digit}>
                    <span>{timeLeft.hours.split('')[0]}</span>
                  </div>
                  <div className={styles.digit}>
                    <span>{timeLeft.hours.split('')[1]}</span>
                  </div>
                </div>
                <span className={styles.colon}>:</span>
              </div>
            </div>

            <div className={styles.countdownDigitsContainer}>
              <span className={styles.digitTitle} style={{ left: '-2px' }}>
                MINUTES
              </span>
              <div className={styles.countdownDigitsContainerInner}>
                <div className={styles.digitContainer}>
                  <div className={styles.digit}>
                    <span>{timeLeft.minutes.split('')[0]}</span>
                  </div>
                  <div className={styles.digit}>
                    <span>{timeLeft.minutes.split('')[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!timeLeft && (
          <div className={styles.mintdone}>
            <h3>
              🌯 Mint is done.{' '}
              <a className={styles.rarity} href="/rarity">
                Check Rarity
              </a>
              😜{' '}
            </h3>
            <div className={styles.opensea}>
              <span>Find us on</span>
              <a href="https://opensea.io/collection/pixelwooks" target="_blank">
                Opensea
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
