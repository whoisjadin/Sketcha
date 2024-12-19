import React, { useState } from "react";
import Artboard from "../pages/Artboard";
import Home from "../pages/Home";
import { useCanvasState } from "../utils/useCanvasState";

function App() {
  const [newSketch, setNewSketch] = useState(false);
  const [isSketchLoaded, setIsSketchLoaded] = useState(false);
  const [fromSettings, setFromSettings] = useState(false);
  const { canvasSize, setCanvasSize } = useCanvasState();
  
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-base-200 from-30% to-base-300">
      {!isSketchLoaded ?
        <Home
          canvasSize={canvasSize}
          setCanvasSize={setCanvasSize}
          setIsSketchLoaded={setIsSketchLoaded}
          newSketch={newSketch}
          setNewSketch={setNewSketch}
          fromSettings={fromSettings}
        />
        :
        <Artboard
          canvasSize={canvasSize}
          setCanvasSize={setCanvasSize}
          setIsSketchLoaded={setIsSketchLoaded}
          setNewSketch={setNewSketch}
          fromSettings={fromSettings}
          setFromSettings={setFromSettings}
        />
      }
    </div>
  );
}

export default App;

