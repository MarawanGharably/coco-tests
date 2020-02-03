import React from "react";
import ExampleContextUser from "./example-context/ExampleContextUser";

// Only needs to import CSS once at <App /> level. All imports for styling should happen in main.scss level from here on
import "./main.scss";

const App = () => {
    return (
        <div>
            HELLO WORLD!
            <ExampleContextUser />
        </div>
    );
};

export default App;
