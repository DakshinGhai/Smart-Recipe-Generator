// src/hooks/useScroll.js
import { useState, useEffect } from 'react';

/**
 * A custom React hook that tracks the window's vertical scroll position.
 * @returns {number} The current vertical scroll position (scrollY).
 */
export function useScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return scrollY;
}