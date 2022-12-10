import { render, screen } from "@testing-library/react";
import TodoListBody from "./TodoListBody";

const mockProps = {
	projectID: 1234,
	todos: {
		1441: {
			title: "Testing is a pain!",
			priority: "low",
			desc: "",
			done: false,
		},
	},
};

describe("TodoListBody component", () => {
	beforeEach(() => {
		render(<TodoListBody {...mockProps} />);
	});

	test("renders todo items", () => {
		expect(screen.getByRole("listitem", { name: "Testing is a pain!" })).toBeInTheDocument();
	});
});
