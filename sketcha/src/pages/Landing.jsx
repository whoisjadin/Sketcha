import React from "react";
import LogoHeader from "../components/LogoHeader";
import preview from "../assets/preview.png";

function Landing() {
    return (
        <div className="flex flex-col justify-center items-center h-svh w-screen bg-gradient-to-b from-base-200 from-30% to-base-300">
            <div className="w-80 sm:w-[40rem] flex flex-col items-center justify-center">
                <LogoHeader />
                <p className="font-thin tracking-widest text-neutral mb-8 text-center sm:text-start">
                    Sketcha is a free and open-source drawing app, perfect for quick sketches and doodles. With support for both desktop and mobile, our tool allows you to quickly sketch your ideas and bring them to life.
                </p>
                <a className="btn bg-base-100 border rounded-md border-primary-content w-full mb-4" href="/sketch">
                    Open in Browser
                </a>
                <button className="btn btn-disabled rounded-md mb-8 w-full" disabled>
                    Download for Desktop
                </button>
            </div>
            <div className="hidden sm:block w-80 rounded-sm sm:mockup-window sm:rounded-md shadow-lg bg-base-100 border border-primary-content">
                <img src={preview} alt="preview" className="w-80" />
            </div>
        </div>
    );
}

export default Landing;

