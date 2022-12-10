import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

const mockProps = {
	open: false,
	data: {
		1234: {
			title: "Default Project",
			active: true,
			todos: {},
		},
	},
};

describe("Sidebar component", () => {
	beforeEach(() => {
		render(<Sidebar {...mockProps} />);
	});

	test("renders 'New Project' button", () => {
		expect(
			screen.getByRole("button", { name: "New Project" })
		).toBeInTheDocument();
	});

	test("renders project items", () => {
		expect(
			screen.getByRole("listitem", { name: "Default Project" })
		).toBeInTheDocument();
	});
});
