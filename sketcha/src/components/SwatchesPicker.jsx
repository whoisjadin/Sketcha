import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

function SwatchesPicker({ color, onChange, presetColors }) {
  const [customColors, setCustomColors] = useState(() => {
    const storedColors = localStorage.getItem("customColors");
    return storedColors ? JSON.parse(storedColors) : [];
  });

  const [selectedColor, setSelectedColor] = useState(null); // Store the selected color to delete

  useEffect(() => {
    localStorage.setItem("customColors", JSON.stringify(customColors));
  }, [customColors]);

  const handleAddSwatch = () => {
    setCustomColors([...customColors, color]);
  };

  const handleClearCustomColors = () => {
    setCustomColors([]); // Clears all custom colors
  };

  const handleClearSelectedColor = () => {
    if (selectedColor) {
      const newColors = customColors.filter(color => color !== selectedColor); // Remove selected color
      setCustomColors(newColors);
      setSelectedColor(null); // Clear selected color after removal
    }
  };

  return (
    <div className="w-full">
      <HexColorPicker color={color} onChange={onChange} className="border border-primary-content rounded-lg"/>
      <div className="w-[12.5rem] mt-2 menu rounded-md border border-primary-content ">
        <details>
        <summary className="text-xs font-bold tracking-wide">Custom Swatches</summary>
        <div className="m">
          <button
            className="btn btn-xs border border-primary-content mt-2 text-xs"
            onClick={handleClearCustomColors}
            disabled={!customColors.length} // Disable if no custom colors
          >
            Clear Custom Colors
          </button>

          {/* Add a button for clearing the selected color */}
          <button
            className="btn btn-xs border border-primary-content mt-2 text-xs"
            onClick={handleClearSelectedColor}
            disabled={!selectedColor} // Disable if no color is selected
          >
            Clear Selected Color
          </button>

          <div className="w-[12.5rem] flex flex-wrap pt-2">
            {presetColors.map((presetColor) => (
              <button
                title={presetColor}
                key={presetColor}
                className="btn btn-sm btn-square border border-primary-content hover:scale-110  m-[2px] mt-2 p-[3px]"
                onClick={() => {
                  onChange(presetColor);
                  setSelectedColor(presetColor); // Set selected color when preset is clicked
                }}
              >
                <div style={{ background: presetColor }} className="w-full h-full border border-primary-content rounded-full"></div>
              </button>
            ))}
            {customColors.map((customColor, index) => (
              <button
                title={customColor}
                key={index}
                onClick={() => {
                  onChange(customColor);
                  setSelectedColor(customColor); // Set selected color when custom color is clicked
                }}
                className="btn btn-sm btn-square border border-primary-content hover:scale-110  m-[2px] mt-2 p-[3px]"
              >
                <div style={{ background: customColor }} className="w-full h-full border border-primary-content rounded-full"></div>
              </button>
            ))}
            <button
              className="btn btn-sm btn-square border border-primary-content hover:scale-110  m-1 mt-2 p-[4px] rounded-md"
              onClick={handleAddSwatch}
            >
              +
            </button>
          </div>
        </div>
        </details>
        </div>
    </div>
  );
}

export default SwatchesPicker;
