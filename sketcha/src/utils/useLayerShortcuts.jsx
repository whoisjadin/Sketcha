// useLayerShortcuts.js
import { useEffect } from "react";

export const useLayerShortcuts = (
    layer,
    activeLayer,
    setActiveLayerId,
    addLayer,
    handleDoubleClick,
    handleToggleLayerVisibility,
    moveLayer,
) => {
    useEffect(() => {

        const handleShortcut = (event) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case 'n':
                        event.preventDefault();
                        addLayer();
                        break;
                    case 'r':
                        event.preventDefault();
                        if (activeLayer) handleDoubleClick(activeLayer);
                        break;
                    case 'v':
                        event.preventDefault();
                        if (activeLayer) handleToggleLayerVisibility(activeLayer.id);
                        break;
                //    case 'ArrowUp':
                //        event.preventDefault();
                //        if (activeLayer) {
                //            moveLayer(activeLayer.id, 'up');
                //            setActiveLayerId(activeLayer.id);
                //        }
                //        break;
                //    case 'ArrowDown':
                //        event.preventDefault();
                //        if (activeLayer) {
                //            moveLayer(activeLayer.id, 'down');
                //            setActiveLayerId(activeLayer.id);
                //        }
                //        break;
                }
            }
        };

        document.addEventListener('keydown', handleShortcut);
        return () => document.removeEventListener('keydown', handleShortcut);
    }, [layer, activeLayer, setActiveLayerId, addLayer, handleDoubleClick, handleToggleLayerVisibility, moveLayer]);
};
