import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
	beforeEach(() => {
		render(<Header />);
	});

	test("renders 'MyTodoList'", () => {
		expect(
			screen.getByRole("heading", { name: "MyTodoList" })
		).toBeInTheDocument();
	});

	test("renders sidebar toggle button", () => {
		expect(screen.getByRole("button")).toHaveAttribute(
			"aria-label",
			"Toggle sidebar"
		);
	});
});
