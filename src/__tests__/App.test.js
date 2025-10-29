import React from "react";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";
import { server } from "../mocks/server";

// MSW server setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/i));

  expect(await screen.findByText(/lorem testum 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/i)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);
  await screen.findByText(/lorem testum 1/i);

  fireEvent.click(screen.getByText(/New Question/i));

  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: "Test Prompt" } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: "Test Answer 1" } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: "Test Answer 2" } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: "1" } });

  fireEvent.submit(screen.getByText(/Add Question/i));
  fireEvent.click(screen.getByText(/View Questions/i));

  expect(await screen.findByText(/Test Prompt/i)).toBeInTheDocument();
});
