import React from "react";
import Canvas from "../components/Canvas";
import Floatbar from "../components/Floatbar";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import Layers from "../components/Layers";
import Settings from "../components/Settings";
import { useZoom } from "../utils/useZoom";
import { useCanvasState } from "../utils/useCanvasState";
import layerTestGif from '../assets/layer-test.gif';

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
            <dialog id="sketchTutorial" className="modal bg-black bg-opacity-50" open>
                <div className="modal-box rounded-md">
                    <h3 className="font-bold text-lg">New Update!</h3>
                    <p className="pt-4">
                        Thank you for using Sketcha. We appreciate all the feedback we have received. This update includes layer sorting, keyboard shortcuts, and a few bug fixes.
                    </p>
                    <div className="carousel my-4 w-full border-t border-primary-content">
                        <div id="updateKeyboardShortcuts" className="carousel-item space-y-2 my-4 flex-col w-full">
                            <h4 className="font-bold">Keyboard Shortcuts</h4>
                            <p>We have added three layer keyboard shortcuts:</p>
                            <div>
                                <p>Press <kbd className="kbd kbd-sm">Ctrl</kbd> + <kbd className="kbd kbd-sm">N</kbd> to create a new layer.</p>
                                <p>Press <kbd className="kbd kbd-sm">Ctrl</kbd> + <kbd className="kbd kbd-sm">R</kbd> to rename a layer.</p>
                                <p>Press <kbd className="kbd kbd-sm">Ctrl</kbd> + <kbd className="kbd kbd-sm">V</kbd> to toggle a layer's visibility.</p>
                            </div>
                            <p>These keybinds can be reconfigured in settings.</p>
                        </div>
                        <div id="updateLayerSorting" className="carousel-item space-y-2 my-4 flex-col w-full">
                            <h4 className="font-bold">Layer Sorting</h4>
                            <p>You can now use the two buttons to the right of any layer you have selected to move it up or down.</p>
                            <img
                                src={layerTestGif}
                                className="m-0 sm:m-auto max-w-xs rounded-md border border-primary-content shadow-sm" 
                                alt="Layer Sorting Example"
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-center gap-2">
                        <a href="#updateKeyboardShortcuts" className="btn btn-xs border border-primary-content">1</a>
                        <a href="#updateLayerSorting" className="btn btn-xs border border-primary-content">2</a>
                    </div>
                    <div className="modal-action flex-col space-x-0 space-y-2">
                        <form method="dialog">
                            <button className="btn border rounded-md w-full border-primary-content">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Artboard;

