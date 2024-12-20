import { useState, useRef, useEffect } from 'react';

export function useZoom(initialScale = 0.8, zoomStep = 0.1, maxScale = 2, minScale = 0.1) {
  const [scale, setScale] = useState(initialScale);
  const zoomableRef = useRef(null);
  const touchStartDistance = useRef(null);

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

  const handleTouchMove = (event) => {
    if (event.touches.length === 2) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const distance = Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2));
      if (touchStartDistance.current === null) {
        touchStartDistance.current = distance;
      } else {
        const scaleChange = distance / touchStartDistance.current;
        let newScale = scale * scaleChange;
        newScale = Math.min(Math.max(newScale, minScale), maxScale);
        setScale(newScale);
        touchStartDistance.current = distance;
      }
    }
  };

  useEffect(() => {
    const handleGestureStart = (event) => {
      event.preventDefault();
      document.body.style.zoom = 0.99;
    };
    const handleGestureChange = (event) => {
      event.preventDefault();
      document.body.style.zoom = 0.99;
    };
    const handleGestureEnd = (event) => {
      event.preventDefault();
      document.body.style.zoom = 1;
    };

    document.addEventListener("gesturestart", handleGestureStart);
    document.addEventListener("gesturechange", handleGestureChange);
    document.addEventListener("gestureend", handleGestureEnd);

    return () => {
      document.removeEventListener("gesturestart", handleGestureStart);
      document.removeEventListener("gesturechange", handleGestureChange);
      document.removeEventListener("gestureend", handleGestureEnd);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scale]);

  return { scale, zoomableRef, zoomStyle };
}