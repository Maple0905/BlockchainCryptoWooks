import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../app-assets/img2/logo.png';
import styles from './header.module.css';
import { ConnectBar } from './ConnectBar';
import { useWeb3Context } from '../../provider';

export const Header = ({
  position = 'top',
  stuckClasses = styles.headerStuck,
  unstuckClasses = styles.notStuck,
  stuckStyles = {},
  unstuckStyles = {},
  children,
}) => {
  const [stuck, setStuck] = React.useState(false);
  const ref = React.createRef();
  const { userAddress, connectWallet } = useWeb3Context();
  const classes = stuck ? stuckClasses : unstuckClasses;
  const style = stuck ? stuckStyles : unstuckStyles;

  const inlineStyles = {
    position: 'sticky',
    [position]: -1,
    ...style,
  };
  React.useEffect(() => {
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(([e]) => setStuck(e.intersectionRatio < 1), { threshold: [1] });
    observer.observe(cachedRef);
    return () => observer.unobserve(cachedRef);
  }, [ref]);

  return (
    <header style={inlineStyles} className={classes} ref={ref}>
      <div className={styles.headerContent}>
        <Link to={'/'}>
          <img src={logo} />
        </Link>
      </div>
    </header>
  );
};
