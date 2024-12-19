import React, { useState, useEffect, useRef } from "react";
import SwatchesPicker from "./SwatchesPicker.jsx";
import * as fabric from "fabric";

function Sidebar({ drawingColor, setDrawingColor, brushSize, setBrushSize, isSidebarOpen }) {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const [canvasState, setCanvasState] = useState(null);

    const presetColors = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808", "#fff", "#000"];

    // Initialize canvas only once
    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
            backgroundColor: "rgba(0, 0, 0, .03)",
        });

        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = drawingColor;
        canvas.freeDrawingBrush.width = brushSize;

        fabricCanvasRef.current = canvas;

        return () => {
            const state = fabricCanvasRef.current.toJSON();
            setCanvasState(state);
            fabricCanvasRef.current.dispose();
        };
    }, []);

    useEffect(() => {
        if (fabricCanvasRef.current) {
            fabricCanvasRef.current.freeDrawingBrush.color = drawingColor;
        }
    }, [drawingColor]);

    useEffect(() => {
        if (isSidebarOpen && canvasState) {
            fabricCanvasRef.current.loadFromJSON(canvasState, fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current));
        }
    }, [isSidebarOpen, canvasState]);

    const handleClearCanvas = () => {
        fabricCanvasRef.current.clear();
        setCanvasState(null);
    };

    useEffect(() => {
        if (fabricCanvasRef.current) {
            fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
        }
    }, [brushSize]);

    return (
        <div className="space-y-2 p-1 w-fit flex flex-col">
                <p className="text-xs font-bold tracking-wide">Color Picker</p>
                <SwatchesPicker color={drawingColor} onChange={setDrawingColor} presetColors={presetColors} />
                <p className="text-xs font-light tracking-wide">Color Testing Pallet</p>
                <canvas ref={canvasRef} className="w-full h-40 rounded-md border border-primary-content " width="200" height="100"></canvas>
                <div className="flex justify-start">
                    <button className="text-left text-xs link-hover link" onClick={handleClearCanvas}>Clear Pallet Canvas</button>
                </div>
                <hr />
                <div className="menu border border-primary-content">
                    <details>
                        <summary className="text-xs font-bold tracking-wide hover:cursor-pointer">Brush Size</summary>
                        <div className="flex items-center space-x-2 mt-2">
                            <input className="input input-bordered border-primary-content rounded-md input-xs px-1 w-12 max-w-xs" type="number" min="1" max="500" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} />
                            <input className="w-full range range-xs" type="range" min="1" max="500" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} />
                        </div>
                        <p className="text-xs font-light tracking-wide mt-2">Preset Brush Sizes</p>
                        <div className="w-[11.5rem] flex flex-wrap">
                            {[4, 8, 16, 32, 64, 128, 256, 500].map((size) => (
                                <button
                                    key={size}
                                    className="btn btn-square btn-sm hover:scale-110  m-[2.4px] p-[2px] rounded-md"
                                    onClick={() => setBrushSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </details>
                </div>
            </div>
    );
}

export default Sidebar;
