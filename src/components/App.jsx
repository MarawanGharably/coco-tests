import React from "react";
import { Header, BodyWrapper, Footer } from "./layouts";

// Only needs to import CSS once at <App /> level. All imports for styling should happen in main.scss level from here on
import "./main.scss";

const App = () => (
    <div className="app-container flex flex-column flex-1">
        <Header />
        <BodyWrapper />
        <Footer />
    </div>
);

export default App;
