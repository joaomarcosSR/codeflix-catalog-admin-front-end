import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GenreForm } from "./GenreForm";

const props = {
  genre: {
    id: "1",
    name: "Test",
    categories: [
      {
        id: "1",
        name: "Category 1",
        description: null,
        is_active: true,
        created_at: "2022-10-01T00:00:00",
        deleted_at: null,
      },
      {
        id: "2",
        name: "Category 2",
        description: null,
        is_active: true,
        created_at: "2022-10-01T00:00:00",
        deleted_at: null,
      },
    ],
    is_active: false,
    created_at: "2022-10-01T00:00:00",
    updated_at: "2022-10-01T00:00:00",
    deleted_at: null,
  },
  categories: [
    {
      id: "1",
      name: "Category 1",
      description: null,
      is_active: true,
      created_at: "2022-10-01T00:00:00",
      deleted_at: null,
    },
    {
      id: "2",
      name: "Category 2",
      description: null,
      is_active: true,
      created_at: "2022-10-01T00:00:00",
      deleted_at: null,
    },
  ],
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  handleToggle: jest.fn(),
  handleAutoCompleteFilterChange: jest.fn(),
};

describe("GenreForm", () => {
  it("should render Genre form correctly", () => {
    const { asFragment } = render(<GenreForm {...props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Genre form with loading state", () => {
    const { asFragment } = render(<GenreForm {...props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Genre form with disabled state", () => {
    const { asFragment } = render(<GenreForm {...props} isDisabled />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
