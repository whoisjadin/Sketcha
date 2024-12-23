function NewSketch({ canvasSize, setCanvasSize, setNewSketch, setIsSketchLoaded, fromSettings }) {
    const handleDimensionChange = (dimension) => (e) => setCanvasSize({ ...canvasSize, [dimension]: parseInt(e.target.value) });

    const handlePresetClick = (width, height) => () => setCanvasSize({ width, height });

    return (
        <div className="min-w-xs sm:w-auto bg-base-100 shadow-sm rounded-md border border-primary-content flex flex-col">
            <div className="p-3 flex-row flex">
                <h1 className="text-xs font-bold tracking-wide flex-1">New Sketch</h1>
                {!fromSettings && (
                    <button
                        className="btn btn-sm btn-square border rounded-md border-primary-content"
                        title="Back"
                        onClick={() => setNewSketch(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="m-auto"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l4 4" />
                            <path d="M5 12l4 -4" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="flex flex-row space-x-4 mx-3">
                <div className="flex flex-col">
                    <label className="text-xs font-thin tracking-wide">Width:</label>
                    <input
                        pattern="[0-9]*"
                        inputMode="decimal"
                        type="number"
                        value={canvasSize.width}
                        className="input input-bordered border-primary-content rounded-md input-sm px-1 w-32"
                        step="10"
                        placeholder="width"
                        onChange={handleDimensionChange('width')}
                    />
                    <label className="text-xs font-thin tracking-wide">Height:</label>
                    <input
                        pattern="[0-9]*"
                        inputMode="decimal"
                        type="number"
                        value={canvasSize.height}
                        className="input input-bordered border-primary-content rounded-md input-sm px-1 w-32"
                        step="10"
                        placeholder="height"
                        onChange={handleDimensionChange('height')}
                    />
                    <h1 className="text-xs font-bold tracking-wide p-1 mt-2">Presets</h1>
                    {[
                        { width: 500, height: 500 },
                        { width: 800, height: 600 },
                        { width: 1280, height: 720 },
                        { width: 1920, height: 1080 },
                        { width: 600, height: 1000 },
                    ].map(({ width, height }) => (
                        <button
                            key={`${width}x${height}`}
                            className="btn btn-sm border rounded-md border-primary-content mb-2"
                            onClick={handlePresetClick(width, height)}
                        >
                            {width} x {height}
                        </button>
                    ))}
                </div>
                <div className="border border-primary-content bg-base-200 w-40 sm:w-80 h-full flex justify-center items-center flex-col">
                    <p className="text-sm font-thin tracking-wider text-neutral-content">
                        {canvasSize.width} x {canvasSize.height} (pixels)
                    </p>
                    <div
                        className="bg-base-100 border max-w-full max-h-full border-primary-content"
                        style={{
                            width: `${(canvasSize.width / (canvasSize.width + canvasSize.height)) * 14}rem`,
                            height: `${(canvasSize.height / (canvasSize.width + canvasSize.height)) * 14}rem`,
                        }}
                    />
                </div>
            </div>
            <button
                className="btn btn-sm m-3 border rounded-md border-primary-content"
                onClick={() => setIsSketchLoaded(true)}
            >
                Create Sketch
            </button>
        </div>
    );
}

export default NewSketch;

