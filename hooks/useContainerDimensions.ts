import { useState, useEffect } from 'react';


export const useContainerDimensions = (myRef: {
  current: HTMLImageElement;
}) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [actualDimensions, setActualDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  const setInitialDimensions = () => {
    if (myRef) {
      setDimensions({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight,
      });
      setActualDimensions({
        width: myRef.current.naturalWidth,
        height: myRef.current.naturalHeight,
      });
    }
  };

  return { dimensions, actualDimensions, setInitialDimensions };
};
