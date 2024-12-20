import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useLayers } from "../utils/useLayers";

function Canvas({
  width,
  height,
  brushSize,
  drawingColor,
  selectedTool, // Tool to track whether we are drawing or erasing
  setLayers,
  layers,
  activeLayerId,
  stageRef
}) {
  const validatedLayers = Array.isArray(layers)
    ? layers.map((layer) => ({
        ...layer,
        lines: Array.isArray(layer.lines) ? layer.lines : [],
      }))
    : [];

  if (!Array.isArray(layers) || validatedLayers.length === 0) return null;

  const activeLayer = validatedLayers.find((layer) => layer.id === activeLayerId);

  if (!activeLayer) return null;

  const [isDrawing, setIsDrawing] = useState(false);
  const [cursorStyle, setCursorStyle] = useState({});
  const [isCursorVisible, setCursorVisible] = useState(false); // State to control cursor visibility
  const [isCanvasHovered, setCanvasHovered] = useState(false); // Track if canvas is hovered

  const layerRefs = useRef({});
  const cursorRef = useRef(null);

  useEffect(() => {
    // Update cursor style whenever brush size or color changes
    setCursorStyle({
      width: `${brushSize}px`, // Set the circle size based on brush size
      height: `${brushSize}px`, // Set the circle size based on brush size
      border: `1px solid ${drawingColor}`, // Keep border fixed
      borderRadius: "50%", // Make it circular
    });
  }, [brushSize, drawingColor]);

  useEffect(() => {
    // Update cursor position based on mouse movements
    const updateCursorPosition = (e) => {
      if (cursorRef.current) {
        const { x, y } = e.target.getStage().getPointerPosition();
        // Center the cursor at the mouse position
        cursorRef.current.style.left = `${x - brushSize / 2}px`; // Adjust for center alignment
        cursorRef.current.style.top = `${y - brushSize / 2}px`; // Adjust for center alignment
      }
    };

    const showCursor = () => setCursorVisible(true); // Show the cursor when mouse enters the canvas
    const hideCursor = () => setCursorVisible(false); // Hide the cursor when mouse leaves the canvas
    const handleMouseEnter = () => setCanvasHovered(true); // Handle canvas hover
    const handleMouseLeave = () => setCanvasHovered(false); // Handle canvas hover leave

    // Listen to mousemove event on the stage
    stageRef.current?.on("mousemove", updateCursorPosition);
    // Listen for mouse enter/leave events on the stage
    stageRef.current?.on("mouseenter", showCursor);
    stageRef.current?.on("mouseleave", hideCursor);

    // Listen for canvas hover events to toggle the custom cursor visibility
    stageRef.current?.getStage().on("mouseenter", handleMouseEnter);
    stageRef.current?.getStage().on("mouseleave", handleMouseLeave);

    return () => {
      stageRef.current?.off("mousemove", updateCursorPosition);
      stageRef.current?.off("mouseenter", showCursor);
      stageRef.current?.off("mouseleave", hideCursor);
      stageRef.current?.getStage().off("mouseenter", handleMouseEnter);
      stageRef.current?.getStage().off("mouseleave", handleMouseLeave);
    };
  }, [stageRef, brushSize]);

  // Handle mouse down to start drawing or erasing
  const handleMouseDown = (e) => {
    if (activeLayer?.visible) {
      const { x, y } = e.target.getStage().getPointerPosition();

      if (selectedTool === "eraser") {
        setIsDrawing(true);
        const updatedLayers = validatedLayers.map((layer) =>
          layer.id === activeLayerId
            ? {
                ...layer,
                lines: [
                  ...layer.lines,
                  {
                    points: [x, y],
                    color: "rgba(0,0,0,1)",
                    size: brushSize,
                    globalCompositeOperation: "destination-out",
                    isEraser: true,
                  },
                ],
              }
            : layer
        );
        setLayers(updatedLayers);
      } else if (selectedTool === "pencil") {
        setIsDrawing(true);
        const updatedLayers = validatedLayers.map((layer) =>
          layer.id === activeLayerId
            ? {
                ...layer,
                lines: [
                  ...layer.lines,
                  { points: [x, y], color: drawingColor, size: brushSize },
                ],
              }
            : layer
        );
        setLayers(updatedLayers);
      }
    }
  };

  // Handle mouse move while drawing or erasing
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { x, y } = e.target.getStage().getPointerPosition();

    if (selectedTool === "eraser") {
      const updatedLayers = validatedLayers.map((layer) => {
        if (layer.id === activeLayerId) {
          const newLines = [...layer.lines];
          const lastLine = newLines[newLines.length - 1];
          lastLine.points = lastLine.points.concat([x, y]);
          return { ...layer, lines: newLines };
        }
        return layer;
      });
      setLayers(updatedLayers);
    } else if (selectedTool === "pencil") {
      const updatedLayers = validatedLayers.map((layer) => {
        if (layer.id === activeLayerId) {
          const newLines = [...layer.lines];
          const lastLine = newLines[newLines.length - 1];
          lastLine.points = lastLine.points.concat([x, y]);
          return { ...layer, lines: newLines };
        }
        return layer;
      });
      setLayers(updatedLayers);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Render lines for each layer
  const renderLines = () => {
    return validatedLayers.map(
      (layer) =>
        layer.visible && (
          <Layer
            key={layer.id}
            ref={(node) => (layerRefs.current[layer.id] = node)}
            opacity={layer.opacity}
            blendMode={layer.blendMode}
          >
            {layer.lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.size}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={line.globalCompositeOperation}
              />
            ))}
          </Layer>
        )
    );
  };

  // Effect to update Konva Layer's opacity and blend mode
  useEffect(() => {
    if (activeLayerId && layerRefs.current[activeLayerId]) {
      const activeLayerRef = layerRefs.current[activeLayerId];
      const activeLayer = validatedLayers.find((layer) => layer.id === activeLayerId);

      if (activeLayer) {
        activeLayerRef.setAttrs({
          opacity: activeLayer.opacity,
          blendMode: activeLayer.blendMode,
        });
        activeLayerRef.getLayer().batchDraw();
      }
    }
  }, [activeLayerId, layers, layerRefs]);

  return (
    <div className="relative">
      {/* The cursor div is now conditionally visible based on the state */}
      <div
        className="custom-cursor"
        style={{
          ...cursorStyle,
          visibility: isCursorVisible ? "visible" : "hidden",
          position: "absolute",
          pointerEvents: "none", // Prevent the custom cursor from blocking interaction
          zIndex: 10, // Ensure it's above the canvas
        }}
        ref={cursorRef}
      ></div>
      <div
        className="bg-base-100 border border-primary-content shadow-md"
        style={{
          cursor: isCanvasHovered ? "none" : "default", // Hide default pointer when canvas is hovered
        }}
      >
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {renderLines()}
        </Stage>
      </div>
    </div>
  );
}

export default Canvas;
