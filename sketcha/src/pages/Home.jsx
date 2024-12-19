import React from "react";
import LogoHeader from "../components/LogoHeader";
import NewSketch from "../components/NewSketch";

function Home({ canvasSize, setCanvasSize, setIsSketchLoaded, newSketch, setNewSketch, fromSettings }) {

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-base-200 from-30% to-base-300">
            <LogoHeader />
            {!newSketch ? (
                <>
                    <p className=" font-thin tracking-widest text-neutral">
                        Whats on your mind? Bring your idea to life.
                    </p>
                    <div className="mt-8 w-64 flex flex-col space-y-4">
                        <button className="btn bg-base-100 border rounded-md border-primary-content w-full" onClick={() => setNewSketch(true)}>
                            Create New Sketch
                        </button>
                        <button className="btn btn-disabled rounded-md w-full" disabled>Load Sketch</button>
                    </div>
                </>
            ) : (
                <NewSketch
                    canvasSize={canvasSize}
                    setCanvasSize={setCanvasSize}
                    setNewSketch={setNewSketch}
                    setIsSketchLoaded={setIsSketchLoaded}
                    fromSettings={fromSettings}
                />
            )}
        </div>
    );
}

export default Home;