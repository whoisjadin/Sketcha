import { useState } from "react";

function Settings({ stageRef, canvasSize, setCanvasSize, setIsSketchLoaded, setFromSettings }) {
    const [fileName, setFileName] = useState('My Sketch');
    const [previewImage, setPreviewImage] = useState(null);

    const handleWidthChange = (e) => setCanvasSize({ ...canvasSize, width: parseInt(e.target.value) });
    const handleHeightChange = (e) => setCanvasSize({ ...canvasSize, height: parseInt(e.target.value) });

    const handleSave = () => {
        if (!stageRef.current) return;

        const width = stageRef.current.width();
        const height = stageRef.current.height();
        const dataURL = stageRef.current.toDataURL({
            width,
            height,
            mimeType: 'image/png',
        });

        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    const handleCopy = () => {
        if (!stageRef.current) return;

        const width = stageRef.current.width();
        const height = stageRef.current.height();
        const dataURL = stageRef.current.toDataURL({
            width,
            height,
            mimeType: 'image/png',
        });

        const image = new Image();
        image.src = dataURL;
        image.onload = () => {
            const canvasElement = document.createElement('canvas');
            canvasElement.width = image.width;
            canvasElement.height = image.height;
            const context = canvasElement.getContext('2d');
            context.drawImage(image, 0, 0);
            canvasElement.toBlob((blob) => {
                navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob,
                    }),
                ]);
            }, 'image/png');
        };
    };

    const handlePreview = () => {
        if (!stageRef.current) return;

        const width = stageRef.current.width();
        const height = stageRef.current.height();
        const dataURL = stageRef.current.toDataURL({
            width,
            height,
            mimeType: 'image/png',
        });

        setPreviewImage(dataURL);
    };

    return (
        <div className="space-y-2 p-1 w-full ">
            <p className="text-xs font-bold tracking-wide">Settings</p>
            <div className="flex flex-rows space-x-4">
                <div className=" flex-cols w-48 space-y-2">
                    <button className="btn btn-sm border rounded-md w-full border-primary-content" onClick={() => { handlePreview(); document.getElementById('save_sketch_preview').showModal(); }}>Save Sketch</button>
                    <button className="btn btn-sm border rounded-md w-full border-primary-content" onClick={handleCopy}>Copy Sketch to Clipboard</button>
                    <button className="btn btn-sm border rounded-md w-full border-primary-content" onClick={() => { document.getElementById('new_sketch_warning').showModal(); }}>New Sketch</button>
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
                            <button className="btn border rounded-md w-full border-primary-content">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="save_sketch_preview" className="modal">
                <div className="modal-box rounded-md">
                    <h3 className="font-bold text-lg mb-4">Save Sketch</h3>
                    <div className="flex flex-row space-x-6">
                        <div className="flex flex-col w-full">
                        <p className="text-sm">Sketch Name:</p>
                        <input type="text" value={fileName} className="input input-bordered border-primary-content rounded-md input-sm px-1 w-full" placeholder="Sketch name" onChange={(e) => setFileName(e.target.value)} />

                    <button className="mt-4 btn border bg-base-100 rounded-md border-primary-content w-full" onClick={handleSave}>Save as PNG</button>
                    </div>
                    <div className="flex-none flex w-40 sm:w-64 h-40 sm:h-64 justify-center items-center border border-primary-content rounded-sm p-2 bg-base-200">
                        {previewImage && (
                            <img src={previewImage} alt="Preview" className="bg-base-100 sm:w-52 w-20 sm:h-52 w-20 m-auto shadow-sm" />
                        )}
                    </div>
                    </div>
                    <div className="modal-action flex-col space-x-0 space-y-2">
                        <form method="dialog">
                            <button className="btn border rounded-md w-full border-primary-content">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
export default Settings;

