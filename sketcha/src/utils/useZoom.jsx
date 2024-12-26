import { useState, useRef, useEffect, useCallback } from 'react';

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
    transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const updateScale = useCallback((newScale) => {
    setScale(prevScale => Math.min(Math.max(newScale, minScale), maxScale));
  }, [minScale, maxScale]);

  const handleWheel = useCallback((event) => {
    event.preventDefault();
    const delta = event.deltaY;
    updateScale(scale + (delta < 0 ? zoomStep : -zoomStep));
  }, [scale, zoomStep, updateScale]);

  const handleTouchMove = useCallback((event) => {
    if (event.touches.length === 2) {
      const [touch1, touch2] = event.touches;
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      if (touchStartDistance.current === null) {
        touchStartDistance.current = distance;
      } else {
        const scaleChange = distance / touchStartDistance.current;
        updateScale(scale * scaleChange);
        touchStartDistance.current = distance;
      }
    }
  }, [scale, updateScale]);

  useEffect(() => {
    const handleGesture = (event) => {
      event.preventDefault();
      document.body.style.zoom = event.type === 'gestureend' ? 1 : 0.99;
    };

    document.addEventListener("gesturestart", handleGesture);
    document.addEventListener("gesturechange", handleGesture);
    document.addEventListener("gestureend", handleGesture);

    return () => {
      document.removeEventListener("gesturestart", handleGesture);
      document.removeEventListener("gesturechange", handleGesture);
      document.removeEventListener("gestureend", handleGesture);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchMove]);

  return { scale, zoomableRef, zoomStyle };
}
