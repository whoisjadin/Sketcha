import logo from '../assets/logo.png';
import React from 'react';

function LogoHeader() {
    return (
        <img src={logo} alt="logo" className="w-80 sm:w-96 mb-8 hover:scale-105 transition duration-300 ease-in-out" />
    );
}

export default LogoHeader;