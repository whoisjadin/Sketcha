import React, { useState, useCallback, useEffect } from "react";
import { useLayers } from '../utils/useLayers';

const Layers = ({ layers,
    setLayers,
    activeLayerId,
    setActiveLayerId, }) => {

    const { handleToggleLayerVisibility } = useLayers(layers, setLayers);

    const [editingLayer, setEditingLayer] = useState(null);
    const [newName, setNewName] = useState("");
    const sortedLayers = [...layers].sort((a, b) => b.id - a.id);

    // Find the currently selected layer
    const activeLayer = layers.find((layer) => layer.id === activeLayerId);

    const addLayer = () => {
        const newLayer = {
            id: Date.now(),
            name: `New Layer (${layers.length})`,
            visible: true,
            lines: [],
            drawingLines: [],
            opacity: 1,
            globalCompositeOperation: "source-over", // default value
        };
        setLayers([...layers, newLayer]);
        setActiveLayerId(newLayer.id); // Automatically set the newly added layer as the active one
    };

    const removeLayer = () => {
        const filteredLayers = layers.filter((layer) => layer.id !== activeLayerId);
        setLayers(filteredLayers);

        if (filteredLayers.length > 0) {
            const newActiveLayer = filteredLayers[0].id; // Always set the first layer as active
            setActiveLayerId(newActiveLayer);
        } else {
            setActiveLayerId(null); // No active layer if all layers are removed
        }
    };

    const handleLayerPropertyChange = (property, value) => {
        const updatedLayers = layers.map((layer) =>
          layer.id === activeLayerId ? { ...layer, [property]: value } : layer
        );
        setLayers(updatedLayers);
      };

    const handleDoubleClick = (layer) => {
        setEditingLayer(layer.id);
        setNewName(layer.name);
    };

    const handleBlur = (layer) => {
        if (newName !== layer.name) {
            const updatedLayers = layers.map((l) =>
                l.id === layer.id ? { ...l, name: newName } : l
            );
            setLayers(updatedLayers);
        }
        setEditingLayer(null);
    };

    useEffect(() => {
        const handleAddLayerShortcut = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
                event.preventDefault();
                addLayer();
            }
        };

        const handleRenameLayerShortcut = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
                event.preventDefault();
                handleDoubleClick(activeLayer);
            }
        };

        const handleToggleVisibilityShotcut = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
                event.preventDefault();
                handleToggleLayerVisibility(activeLayer.id);
            }
        };

        document.addEventListener('keydown', handleAddLayerShortcut);
        document.addEventListener('keydown', handleRenameLayerShortcut);
        document.addEventListener('keydown', handleToggleVisibilityShotcut);

        return () => {
            document.removeEventListener('keydown', handleAddLayerShortcut);
            document.removeEventListener('keydown', handleRenameLayerShortcut);
            document.removeEventListener('keydown', handleToggleVisibilityShotcut);
        };
    }, [addLayer, activeLayer, handleDoubleClick]);

    return (
        <div className="space-y-2 p-1 w-fit flex flex-col">
            <p className="text-xs font-bold tracking-wide">Layers</p>

            <div className="space-x-2 flex flex-row items-center">
                <div className="flex flex-col">
                    <p className="text-xs pb-1">Controls</p>
                    <div className="space-x-2 w-20">
                        <button
                            onClick={addLayer}
                            title="Add New Layer"
                            className="btn btn-sm btn-square border border-primary-content"
                        >
                            +
                        </button>
                        <button
                            onClick={removeLayer}
                            title="Remove Current Layer"
                            className="btn btn-sm btn-square border border-primary-content"
                        >
                            -
                        </button>
                    </div>
                </div>
                {/* Controls for Blend Mode */}
                {activeLayer && (
                    <div className="flex flex-col">
                        <label className="text-xs pb-1">Blend Mode</label>
                        <select
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

            {/* Opacity Control for the Selected Layer */}
            {activeLayer && (
                <div className="py-2">
                    <div className="flex items-center space-x-2">
                        <label className="text-xs">Opacity</label>
                        <input
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

            {/* Layer List */}
            <ul className="divide-y divide-primary-content border border-primary-content">
                {sortedLayers.map((layer) => (
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
                                className={`border-l border-primary-content py-2 px-4 flex justify-center items-center ${layer.id === activeLayerId ? "font-bold" : ""}`}
                            >
                                {editingLayer === layer.id ? (
                                    <input
                                        className="input input-sm w-36"
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                              handleBlur(layer);
                                            }
                                          }}
                                        onBlur={() => handleBlur(layer)}
                                        autoFocus
                                    />
                                ) : (
                                    layer.name
                                )}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Layers;
