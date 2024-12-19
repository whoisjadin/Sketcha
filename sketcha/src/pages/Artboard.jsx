import React from "react";
import Canvas from "../components/Canvas";
import Floatbar from "../components/Floatbar";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import Layers from "../components/Layers";
import Settings from "../components/Settings";
import { useZoom } from "../utils/useZoom";
import { useCanvasState } from "../utils/useCanvasState";

function Artboard({ canvasSize, setCanvasSize, setIsSketchLoaded, fromSettings, setFromSettings }) {
    const {
        scale,
        zoomableRef,
        zoomStyle
    } = useZoom();

    const {
        drawingColor,
        setDrawingColor,
        brushSize,
        setBrushSize,
        selectedTool,
        setSelectedTool,
        layers,
        setLayers,
        activeLayerId,
        setActiveLayerId,
        stageRef,
    } = useCanvasState();

    return (
        <div className="overflow-hidden h-screen w-screen flex justify-center items-center">
            <Floatbar position="top" name="Navbar">
                <Toolbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            </Floatbar>
            <Floatbar position="right" name="Layers">
                <Layers
                    layers={layers}
                    setLayers={setLayers}
                    activeLayerId={activeLayerId}
                    setActiveLayerId={setActiveLayerId}
                />
            </Floatbar>
            <Floatbar position="left" name="Sidebar">
                <Sidebar
                    drawingColor={drawingColor}
                    setDrawingColor={setDrawingColor}
                    brushSize={brushSize}
                    setBrushSize={setBrushSize}
                />
            </Floatbar>
            <Floatbar position="bottom" name="Settings">
                <Settings
                    stageRef={stageRef}
                    canvasSize={canvasSize}
                    setCanvasSize={setCanvasSize}
                    setIsSketchLoaded={setIsSketchLoaded}
                    setFromSettings={setFromSettings}
                    fromSettings={fromSettings}
                />
            </Floatbar>

            <div ref={zoomableRef} style={zoomStyle}>
                <p className="font-thin tracking-wider text-neutral-content">
                    {canvasSize.width} x {canvasSize.height} (pixels)
                </p>
                <Canvas
                    stageRef={stageRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    scale={scale}
                    drawingColor={drawingColor}
                    brushSize={brushSize}
                    selectedTool={selectedTool}
                    layers={layers}
                    setLayers={setLayers}
                    activeLayerId={activeLayerId}
                    setActiveLayerId={setActiveLayerId}
                />
            </div>
        </div>
    );
}

export default Artboard;

