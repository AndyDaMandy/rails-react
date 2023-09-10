import NavBar from "../../src/components/NavBar.jsx";
import {MemoryRouter} from "react-router-dom";
import { render, screen} from "@testing-library/react";

describe("NavBar component", () => {
    const renderNavBar = () => {
        render(<NavBar />, { wrapper: MemoryRouter});
    };
    test("renders both links", () => {
        //render the navbar
        renderNavBar();
        //expect the links to be there
        expect(screen.getByText("Posts List")).toBeInTheDocument();
        expect(screen.getByText("Create New Post")).toBeInTheDocument();
    });
});