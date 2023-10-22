import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ element }) {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(element);
    element.current.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
