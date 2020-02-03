import React from "react";
import ExampleContextUser from "./example-context/ExampleContextUser";

// Only needs to import CSS once at <App /> level. All imports for styling should happen in main.scss level from here on
import "./main.scss";
import Header from "./header/Header";
import BodyWrapper from "./body-wrapper/BodyWrapper";
import Footer from "./footer/Footer";

const App = () => (
    <div className="app-container flex flex-column flex-1">
        <Header />
        <BodyWrapper />
        <Footer />
    </div>
);

export default App;
