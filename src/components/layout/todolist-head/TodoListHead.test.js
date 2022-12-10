import { render, screen } from "@testing-library/react";
import TodoListHead from "./TodoListHead";

describe("TodoListHead component", () => {
	test("New Item button is enabled only if there is an active project", () => {
		const componentProps = {
			id: 1234,
			title: "Default Project",
			active: true,
			todos: {},
		};
		render(<TodoListHead activeProjectData={componentProps} />);

		const buttonEl = screen.getByRole("button", { name: "New Item" });
		expect(buttonEl).toBeInTheDocument();
		expect(buttonEl).toBeEnabled();
	});

	test("New Item button is disabled if there is no active project", () => {
		render(<TodoListHead />);
		const buttonEl = screen.getByRole("button", { name: "New Item" });
		expect(buttonEl).toBeInTheDocument();
		expect(buttonEl).toBeDisabled();
	});
});
