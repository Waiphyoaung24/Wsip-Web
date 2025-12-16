import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

describe("About page", () => {
  it("describes the example routing", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/demonstrate routing and page transitions/i)
    ).toBeInTheDocument();
  });
});


