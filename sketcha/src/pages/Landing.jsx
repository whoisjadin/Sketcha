import React from "react";
import LogoHeader from "../components/LogoHeader";
import preview from "../assets/preview.png";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row justify-center items-center h-screen space-x-24 bg-base-200">
            <div className="flex flex-col justify-center items-center">
                <LogoHeader />
                <p className="font-thin tracking-widest text-neutral mb-8 w-[30rem]">
                    Sketcha is a free and open source sketching app. Quickly sketch your ideas and bring them to life.
                </p>
                <button className="btn bg-base-100 border rounded-md border-primary-content w-full mb-4" onClick={() => navigate("/sketch")}>
                    Open in Browser
                </button>
                <button className="btn btn-disabled rounded-md w-full" disabled>
                    Download for Desktop
                </button>
            </div>
            <div className="mockup-window rounded-md shadow-lg bg-base-100 border border-primary-content">
                <img src={preview} alt="preview" className="h-72" />
            </div>
        </div>
    );
}

export default Landing;
