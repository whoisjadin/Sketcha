import React, { useRef } from "react";

// Define the available tools with their icons
const tools = [
    {
        id: 'select',
        title: 'Select Tool',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12l3 0" />
                <path d="M12 3l0 3" />
                <path d="M7.8 7.8l-2.2 -2.2" />
                <path d="M16.2 7.8l2.2 -2.2" />
                <path d="M7.8 16.2l-2.2 2.2" />
                <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
            </svg>
        ),
    },
    {
        id: 'pencil',
        title: 'Pencil Tool',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                <path d="M13.5 6.5l4 4" />
            </svg>
        ),
    },
//    {
//        id: 'brush',
//        title: 'Brush Tool',
//        icon: (
//            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
//                <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
//                <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
//                <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
//            </svg>
//        ),
//    },
//    {
//        id: 'fill',
//        title: 'Fill Tool',
//        icon: (
//            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                <path d="M5 16l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z" />
//                <path d="M13.737 9.737c2.299 -2.3 3.23 -5.095 2.081 -6.245c-1.15 -1.15 -3.945 -.217 -6.244 2.082c-2.3 2.299 -3.231 5.095 -2.082 6.244c1.15 1.15 3.946 .218 6.245 -2.081z" />
//                <path d="M7.492 11.818c.362 .362 .768 .676 1.208 .934l6.895 4.047c1.078 .557 2.255 -.075 3.692 -1.512c1.437 -1.437 2.07 -2.614 1.512 -3.692c-.372 -.718 -1.72 -3.017 -4.047 -6.895a6.015 6.015 0 0 0 -.934 -1.208" />
//            </svg>
//        ),
//    },
    {
        id: 'eraser',
        title: 'Eraser Tool',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
                <path d="M18 13.3l-6.3 -6.3" />
            </svg>
        ),
    },
//    {
//        id: 'wand',
//        title: 'Wand Tool',
//        icon: (
//            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                <path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
//                <path d="M15 6l3 3" />
//                <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
//                <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
//            </svg>
//        ),
//    },
];

function Toolbar({ selectedTool, setSelectedTool }) {
    const radioButtonsRef = useRef([]);

    const handleSelectTool = (toolId) => {
        setSelectedTool(toolId);
        radioButtonsRef.current.forEach((radioButton) => {
            radioButton.checked = radioButton.value === toolId;
        });
    };

    return (
        <div className="flex flex-row justify-center items-center space-x-2 p-1">
            {tools.map(({ id, title, icon }) => (
                <label key={id} title={title} className="btn btn-square hover:scale-110 border border-primary-content has-[:checked]:bg-neutral-content">
                    <input
                        type="radio"
                        id={id}
                        name="tool"
                        value={id}
                        checked={selectedTool === id}
                        onChange={() => handleSelectTool(id)}
                        className="sr-only"
                    />
                    {icon}
                </label>
            ))}
        </div>
    );
}

export default Toolbar;