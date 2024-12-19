function Settings({ stageRef, canvasSize, setCanvasSize, setIsSketchLoaded, setFromSettings }) {
    const handleWidthChange = (e) => setCanvasSize({ ...canvasSize, width: parseInt(e.target.value) });
    const handleHeightChange = (e) => setCanvasSize({ ...canvasSize, height: parseInt(e.target.value) });

    const handleSave = () => {
        if (stageRef.current) {
            const width = stageRef.current.width();
            const height = stageRef.current.height();
            const dataURL = stageRef.current.toDataURL({
                width,
                height,
                mimeType: 'image/png',
            });
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'image.png';
            link.click();
        }
    };

    return (
        <div className="space-y-2 p-1 w-full ">
            <p className="text-xs font-bold tracking-wide">Settings</p>
            <div className="flex flex-rows space-x-4">
                <div className=" flex-cols w-48 space-y-2">
                    <button className="btn btn-sm border rounded-md w-full border-primary-content" onClick={handleSave}>Save Sketch as PNG</button>
                    <button className="btn btn-sm btn-disabled rounded-md w-full" disabled>Copy Sketch to Clipboard</button>
                    <button className="btn btn-sm border rounded-md w-full border-primary-content" onClick={() => document.getElementById('new_sketch_warning').showModal()}>New Sketch</button>

                </div>
                <div className=" flex-cols w-32">
                    <label className="text-xs font-thin tracking-wide">Width:</label>
                    <input type="number" value={canvasSize.width} className="input input-bordered border-primary-content rounded-md input-sm px-1 w-32" step="10" placeholder="width" onChange={handleWidthChange} />
                    <label className="text-xs font-thin tracking-wide">Height:</label>
                    <input type="number" value={canvasSize.height} className="input input-bordered border-primary-content rounded-md input-sm px-1 w-32" step="10" placeholder="height" onChange={handleHeightChange} />
                </div>
            </div>
            <dialog id="new_sketch_warning" className="modal">
                <div className="modal-box rounded-md">
                    <h3 className="font-bold text-lg">Create a New Sketch</h3>
                    <p className="py-4">Are you sure you want to create a new sketch? This will clear the current sketch.</p>
                    <div className="modal-action flex-col space-x-0 space-y-2">
                        <button className="btn border bg-base-100 rounded-md w-full border-primary-content" onClick={() => { setIsSketchLoaded(false); setFromSettings(true); }}>Create New Sketch</button>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn border rounded-md w-full border-primary-content">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
export default Settings;