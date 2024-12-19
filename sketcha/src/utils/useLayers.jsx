export function useLayers( layers, setLayers) {

  const handleToggleLayerVisibility = (layerId) => {
    const updatedLayers = layers.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    );
    setLayers(updatedLayers);
};

  return {
    handleToggleLayerVisibility
  };
}