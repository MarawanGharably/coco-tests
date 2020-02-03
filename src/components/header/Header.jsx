import React, { useState, useEffect } from "react";
import ObsessHeaderLogo from "./obsess-logo/ObsessHeaderLogo";

const Header = () => (
    <div className="header-container full-width flex">
        <div className="header-left-side flex flex-center">
            <ObsessHeaderLogo />
        </div>
        <div className="header-right-side flex flex-center">
            <span>PLACEHOLDER</span>
        </div>
    </div>
);

export default Header;
