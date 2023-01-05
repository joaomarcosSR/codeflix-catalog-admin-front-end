import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryForm } from "./CategoryForm";

const props = {
  category: {
    id: "1",
    name: "Test",
    description: "Description test",
    is_active: false,
    type: "DIRECTOR",
    created_at: "2022-10-01T00:00:00",
    deleted_at: null,
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  handleToggle: jest.fn(),
};

describe("CategoryForm", () => {
  it("should render castMember form correctly", () => {
    const { asFragment } = render(<CategoryForm {...props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Category form with loading state", () => {
    const { asFragment } = render(<CategoryForm {...props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Category form with disabled state", () => {
    const { asFragment } = render(
      <CategoryForm {...props} isDisabled isLoading />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
