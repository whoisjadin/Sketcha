import { useState, useRef } from 'react';

export function useCanvasState() {
    const [drawingColor, setDrawingColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(20);
    const [selectedTool, setSelectedTool] = useState("pencil");
    const [layers, setLayers] = useState([
        { id: 1, name: "Background", visible: true, lines: [], drawingLines: [], opacity: 1, blendMode: "normal" },
    ]);
    const [activeLayerId, setActiveLayerId] = useState(1);
    const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 1000 });
    const stageRef = useRef(null);

    const handleWidthChange = (e) => setCanvasSize({ ...canvasSize, width: parseInt(e.target.value) });
    const handleHeightChange = (e) => setCanvasSize({ ...canvasSize, height: parseInt(e.target.value) });

    return {
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
        canvasSize,
        setCanvasSize,
        stageRef,
        handleWidthChange,
        handleHeightChange,
    };
};