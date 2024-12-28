import React, { useState, useEffect } from "react";
import { useLayers } from '../utils/useLayers';
import { useLayerShortcuts } from '../utils/useLayerShortcuts';

const Layers = ({ layers, setLayers, activeLayerId, setActiveLayerId }) => {
    const { handleToggleLayerVisibility } = useLayers(layers, setLayers);

    
    const [editingLayer, setEditingLayer] = useState(null);
    const [newName, setNewName] = useState("");

    const activeLayer = layers.find((layer) => layer.id === activeLayerId);


    const addLayer = () => {
        const newLayer = {
            id: Date.now(),
            name: `New Layer (${layers.length})`,
            visible: true,
            lines: [],
            drawingLines: [],
            opacity: 1,
            globalCompositeOperation: "source-over",
        };
        setLayers((prevLayers) => [...prevLayers, newLayer]);
        setActiveLayerId(newLayer.id);
    };


    const removeLayer = () => {
        setLayers((prevLayers) => {
            const filteredLayers = prevLayers.filter((layer) => layer.id !== activeLayerId);
            const newActiveLayerId = filteredLayers.length > 0 ? filteredLayers[0].id : null;
            setActiveLayerId(newActiveLayerId);
            return filteredLayers;
        });
    };

    const handleLayerPropertyChange = (property, value) => {
        setLayers((prevLayers) =>
            prevLayers.map((layer) =>
                layer.id === activeLayerId ? { ...layer, [property]: value } : layer
            )
        );
    };

    const moveLayer = (layerId, direction) => {
        setLayers((prevLayers) => {
            const index = prevLayers.findIndex((layer) => layer.id === layerId);
            if (index === -1) return prevLayers;

            const updatedLayers = [...prevLayers];
            const [layer] = updatedLayers.splice(index, 1);
            const newIndex = direction === 'up' ? index + 1 : index - 1;
            updatedLayers.splice(newIndex, 0, layer);

            return updatedLayers;
        });
        setActiveLayerId(layerId);
    };

    const handleDoubleClick = (layer) => {
        setEditingLayer(layer.id);
        setNewName(layer.name);
    };

    const handleBlur = () => {
        if (newName !== activeLayer?.name) {
            setLayers((prevLayers) =>
                prevLayers.map((layer) =>
                    layer.id === activeLayerId ? { ...layer, name: newName } : layer
                )
            );
        }
        setEditingLayer(null);
    };

    useLayerShortcuts(activeLayer, activeLayerId, setActiveLayerId, addLayer, handleDoubleClick, handleToggleLayerVisibility, moveLayer);

    return (
        <div className="space-y-2 p-1 w-fit flex flex-col">
            <p className="text-xs font-bold tracking-wide">Layers</p>

            <div className="space-x-2 flex flex-row items-center">
                <div className="flex flex-col">
                    <p className="text-xs pb-1">Controls</p>
                    <div className="space-x-2 w-20">
                        <button onClick={addLayer} title="Add New Layer" className="btn btn-sm btn-square border border-primary-content">+</button>
                        <button onClick={removeLayer} title="Remove Current Layer" className="btn btn-sm btn-square border border-primary-content">-</button>
                    </div>
                </div>

                {activeLayer && (
                    <div className="flex flex-col">
                        <label htmlFor="blendMode" className="text-xs pb-1">Blend Mode</label>
                        <select
                        name="Blend Mode"
                            id="blendMode"
                            value={activeLayer.globalCompositeOperation}
                            onChange={(e) => handleLayerPropertyChange("globalCompositeOperation", e.target.value)}
                            className="select select-sm w-28 border border-primary-content"
                            disabled
                        >
                            <option value="source-over">Normal</option>
                            <option value="multiply">Multiply</option>
                            <option value="screen">Screen</option>
                            <option value="overlay">Overlay</option>
                            <option value="darken">Darken</option>
                            <option value="lighten">Lighten</option>
                        </select>
                    </div>
                )}
            </div>

            {activeLayer && (
                <div className="py-2">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="opacity" className="text-xs">Opacity</label>
                        <input
                        name="opacity"
                            id="opacity"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={activeLayer.opacity}
                            onChange={(e) => handleLayerPropertyChange("opacity", parseFloat(e.target.value))}
                            className="w-full range range-xs cursor-pointer"
                        />
                    </div>
                </div>
            )}

            <ul className="divide-y divide-primary-content border border-primary-content">
                {layers.slice().reverse().map((layer) => (
                    <li key={layer.id} className="rounded-sm flex flex-row">
                        <div className="rounded-sm flex flex-row">
                            <button
                                onClick={() => handleToggleLayerVisibility(layer.id)}
                                title="Toggle Visibility"
                                className="btn shadow-none btn-square rounded-none p-2 bg-base-200 hover:bg-base-300"
                            >
                                {layer.visible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                        <path d="M3 3l18 18" />
                                    </svg>
                                )}
                            </button>
                            <p
                                onClick={() => setActiveLayerId(layer.id)}
                                onDoubleClick={() => handleDoubleClick(layer)}
                                className={`border-l border-primary-content p-2 flex items-center w-36 text-ellipsis overflow-hidden truncate ${layer.id === activeLayerId ? "font-bold" : ""}`}
                            >
                                {editingLayer === layer.id ? (
                                    <input
                                        className="input input-sm w-full rounded-md px-1"
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleBlur();
                                        }}
                                        onBlur={handleBlur}
                                        autoFocus
                                    />
                                ) : (
                                    layer.name
                                )}
                            </p>
                            {layer.id === activeLayerId && (
                                <div className="flex flex-col w-6 border-l border-primary-content">
                                    <button
                                        title="Move Layer Up"
                                        className="btn btn-xs shadow-none rounded-none bg-base-200 hover:bg-base-300 border-b-[.5px] border-0 border-primary-content p-0"
                                        onClick={() => moveLayer(layer.id, 'up')}
                                    >
                                        <svg  xmlns="http://www.w3.org/2000/svg"  width="14"  height="14"  viewBox="0 0 24 24"  fill="currentColor"  className="m-auto"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" /></svg>
                                    </button>
                                    <button
                                        title="Move Layer Down"
                                        className="btn btn-xs shadow-none rounded-none bg-base-200 hover:bg-base-300 border-t-[.5px] border-0 border-primary-content p-0"
                                        onClick={() => moveLayer(layer.id, 'down')}
                                    >
                                        <svg  xmlns="http://www.w3.org/2000/svg"  width="14"  height="14"  viewBox="0 0 24 24"  fill="currentColor"  className="m-auto"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" /></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Layers;
