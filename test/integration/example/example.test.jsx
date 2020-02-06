import "@testing-library/jest-dom/extend-expect";
import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import FancyButton from "../../../src/components/fancy-button/FancyButton";
import UserIcon from "../../../src/layouts/header/user-icon/UserIcon";

const ExampleIntegrationComponent = () => {
    const [image, setImage] = useState("");

    const onClick = () => { setImage("https://via.placeholder.com/150"); };

    return (
        <div>
            <FancyButton onClick={onClick} text="TEST" />
            <UserIcon imgUrl={image} />
        </div>
    );
};

describe("Example Integration Test", () => {
    test("Does clicking change image", () => {
        const { getByAltText, getByLabelText } = render(<ExampleIntegrationComponent />);

        fireEvent.click(getByLabelText("fancy button"));

        expect(getByLabelText("fancy button")).toHaveTextContent("TEST");
        expect(getByAltText("user icon")).toHaveProperty("src", "https://via.placeholder.com/150");
    });
});
