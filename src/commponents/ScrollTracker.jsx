import React, { useEffect, useState } from 'react';

const ScrollTracker = () => {
  const [scrollDirection, setScrollDirection] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      const scrollDirection = currentPosition > scrollPosition ? 'down' : 'up';
      setScrollDirection(scrollDirection);
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  // }, [scrollPosition]);

  return (
    
    scrollDirection
  );
};

export default ScrollTracker;