import { useState, useRef, useEffect } from 'react';

export function useZoom(initialScale = 0.8, zoomStep = 0.1, maxScale = 2, minScale = 0.1) {
  const [scale, setScale] = useState(initialScale);
  const zoomableRef = useRef(null);

  const zoomStyle = {
    position: 'relative',
    top: "0%",
    left: "0%",
    width: 'auto',
    height: 'auto',
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '500ms',
    transitionProperty: 'transform',

  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY;
    let newScale = scale + (delta < 0 ? zoomStep : -zoomStep);
    newScale = Math.min(Math.max(newScale, minScale), maxScale);
    setScale(newScale);
  };

  useEffect(() => {
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [scale]);

  return { scale, zoomableRef, zoomStyle };
}
