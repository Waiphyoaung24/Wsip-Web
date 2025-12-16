import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders welcome heading", () => {
    render(<Home />);
    expect(
      screen.getByText(/welcome to your basic next\.js skeleton/i)
    ).toBeInTheDocument();
  });
});


