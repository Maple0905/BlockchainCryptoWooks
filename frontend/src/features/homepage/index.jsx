import React from 'react';
import styles from '../../app.module.css';
import { HeroContainer } from './hero/heroContainer';
import { MobileWooksView } from './hero/MobileWooksView';
import { WookCTA } from './CTA/wookCTA';
import { Banner } from './banner/banner';
import { CelebBanner } from './celeb/CelebBanner';
import { Roadmap } from './roadmap/Roadmap';
import { About } from './about/About';
import { MintInfo } from './mint-info';
import { ConnectBarHome } from './connect-bar';
import { MintBar } from './connect-bar/MintBar';
import { Footer } from '../footer';
import { useWeb3Context } from '../../provider';
import { Perks } from './perks';
import { HowTo } from './howTo';
export const Homepage = () => {
  const { userAddress, isSaleActive, mintNFT, transactionInProgress, getCurrentTokenID, isSuccess } = useWeb3Context();
  return (
    <>
      <HeroContainer />
      <MobileWooksView />
      <Roadmap />
      <WookCTA />
      <CelebBanner />

      <About />
      <Footer />
    </>
  );
};
