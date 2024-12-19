import logo from '../assets/logo.png';
import React from 'react';

function LogoHeader() {
    return (
        <img src={logo} alt="logo" className="lg:h-36 md:h-24 hover:scale-105 transition duration-300 ease-in-out" />
    );
}

export default LogoHeader;