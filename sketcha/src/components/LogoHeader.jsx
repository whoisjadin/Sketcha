import logo from '../assets/logo.png';
import React from 'react';

function LogoHeader() {
    return (
        <img src={logo} alt="logo" className="h-24 mb-8 hover:scale-105 transition duration-300 ease-in-out" />
    );
}

export default LogoHeader;