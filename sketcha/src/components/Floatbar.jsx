import React, { useState } from "react";

function FloatbarContent({ children, ...props }) {
    return (
        <div className="p-2" {...props}>
            {children}
        </div>
    );
}

function Floatbar({ position, name, children, ...props }) {

    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => setIsOpen((prev) => !prev);

    switch (position) {
        case "left":
            return <FloatbarLeft isOpen={isOpen} onToggle={handleToggle} name={name} children={children} {...props} />;
        case "right":
            return <FloatbarRight isOpen={isOpen} onToggle={handleToggle} name={name} children={children} {...props} />;
        case "top":
            return <FloatbarTop isOpen={isOpen} onToggle={handleToggle} name={name} children={children} {...props} />;
        case "bottom":
            return <FloatbarBottom isOpen={isOpen} onToggle={handleToggle} name={name} children={children} {...props} />;
        default:
            throw new Error(`Invalid position: ${position}`);
    };
}

function FloatbarLeft({ isOpen, onToggle, name, children, ...props }) {
    return (
        <div>
            {isOpen ? (
                <div className="fixed flex flex-row top-[50%] translate-y-[-50%] left-0 justify-center items-center transition-all duration-300 ease-in-out z-50">
                    <div className="flex flex-col space-y-2 bg-base-100 border border-primary-content rounded-lg h-full min-h-36 max-w-80 w-full shadow-sm ms-4">
                        <FloatbarContent {...props}>
                            {children}
                        </FloatbarContent>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={onToggle}
                            title={`Collapse ${name}`}
                            className="transition-all duration-200 ease-in-out shadow-sm z-[100] border-primary-content rounded-r-md border-y border-r h-20 sm:w-4 w-6 sm:hover:w-6 hover:w-8 hover:h-[4.5rem] bg-base-100 hover:bg-base-200 flex justify-center items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="m-auto"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={onToggle}
                    title={`Expand ${name}`}
                    className="transition-all duration-200 ease-in-out shadow-sm z-[100] rounded-r-md border-primary-content border h-20 sm:w-6 w-8 sm:hover:w-8 hover:w-10 hover:h-[5.5rem] bg-base-100 hover:bg-base-200 fixed top-[50%] translate-y-[-50%] left-0 flex justify-center items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-auto">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

function FloatbarRight({ isOpen, onToggle, name, children, ...props }) {
    return (
        <div>
            {isOpen ? (
                <div className="fixed flex flex-row top-[50%] translate-y-[-50%] right-0 justify-center items-center transition-all duration-300 ease-in-out z-50">
                    <div className="flex justify-center items-center">
                        <button
                            onClick={onToggle}
                            title={`Collapse ${name}`}
                            className="transition-all duration-200 ease-in-out border-primary-content shadow-sm z-[100] rounded-l-md border-y border-l h-20 sm:w-4 w-6 sm:hover:w-6 hover:w-8  hover:h-[4.5rem] bg-base-100 hover:bg-base-200 flex justify-center items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="m-auto"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-2 bg-base-100 border-primary-content border rounded-lg h-full min-h-36 max-w-80 w-full shadow-sm me-4">
                        <FloatbarContent {...props}>
                            {children}
                        </FloatbarContent>
                    </div>
                </div>
            ) : (
                <button
                    onClick={onToggle}
                    title={`Expand ${name}`}
                    className="transition-all duration-200 ease-in-out shadow-sm z-[100] rounded-l-md border h-20 sm:w-6 w-8 sm:hover:w-8 hover:w-10 hover:h-[5.5rem] border-primary-content bg-base-100 hover:bg-base-200 fixed right-0 top-[50%] translate-y-[-50%] flex justify-center items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="m-auto"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

function FloatbarTop({ isOpen, onToggle, name, children, ...props }) {
    return (
        <div>
            {isOpen ? (
                <div className="flex flex-col fixed left-[50%] translate-x-[-50%] top-0 z-50 my-4">
                    <div className="bg-base-100 shadow-sm rounded-lg h-full max-h-80 w-full min-w-36 border border-primary-content flex flex-row justify-center items-center space-x-2">
                        <FloatbarContent {...props}>
                            {children}
                        </FloatbarContent>
                    </div>
                    <button
                        onClick={onToggle}
                        title={`Collapse ${name}`}
                        className="shadow-sm rounded-b-md border-b border-x w-20 sm:h-4 h-6 sm:hover:h-6 hover:h-8 hover:w-[4.5rem] border-primary-content flex justify-center items-center mx-auto bg-base-100 hover:bg-base-200 transition-all duration-200 ease-in-out"
                    >
                        <svg
                            className="m-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M17 11v6l-5 -4l-5 4v-6l5 -4z" />
                        </svg>
                    </button>
                </div>
            ) : (
                <button
                    onClick={onToggle}
                    title={`Expand ${name}`}
                    className="shadow-sm z-[100] rounded-b-md border-b border-x w-20 sm:h-6 h-8 sm:hover:h-8 hover:h-10 hover:w-24 flex border-primary-content justify-center items-center bg-base-100 hover:bg-base-200 fixed top-0 left-[50%] translate-x-[-50%] transition-all duration-200 ease-in-out"
                >
                    <svg
                        className="m-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 13v-6l-5 4l-5 -4v6l5 4z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

function FloatbarBottom({ isOpen, onToggle, name, children, ...props }) {
    return (
        <div>
            {!isOpen ? (
                <div className="flex flex-col fixed left-[50%] translate-x-[-50%] bottom-0 z-50 my-4">
                    <button
                        onClick={onToggle}
                        title={`Collapse ${name}`}
                        className="shadow-sm rounded-t-md border-t border-x w-20 sm:h-4 h-6 sm:hover:h-6 hover:h-8 hover:w-[4.5rem] flex border-primary-content justify-center items-center mx-auto bg-base-100 hover:bg-base-200 transition-all duration-200 ease-in-out"
                    >
                        <svg
                            className="m-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 13v-6l-5 4l-5 -4v6l5 4z" />
                        </svg>
                    </button>
                    <div className="bg-base-100 shadow-sm rounded-lg h-full max-h-80 w-full min-w-36 border flex flex-row border-primary-content justify-center items-center space-x-2">
                        <FloatbarContent {...props}>
                            {children}
                        </FloatbarContent>
                    </div>
                </div>
            ) : (
                <button
                    onClick={onToggle}
                    title={`Expand ${name}`}
                    className="shadow-sm z-[100] rounded-t-md border-t border-x w-20 sm:h-6 h-8 sm:hover:h-8 hover:h-10 hover:w-24 flex justify-center border-primary-content items-center bg-base-100 hover:bg-base-200 fixed bottom-0 left-[50%] translate-x-[-50%] transition-all duration-200 ease-in-out"
                >
                    <svg
                        className="m-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 11v6l-5 -4l-5 4v-6l5 -4z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Floatbar;