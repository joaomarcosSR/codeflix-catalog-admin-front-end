import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GenreTable } from "./GenreTable";

const props = {
  data: undefined,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 20, 30],
  handleOnPageChange: jest.fn(),
  handleFilterChange: jest.fn(),
  handleOnPageSizeChange: jest.fn(),
  handleDelete: jest.fn(),
};

describe("GenreTable", () => {
  it("should render Genre table correctly", () => {
    const { asFragment } = render(<GenreTable {...props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Genre table with loading", () => {
    const { asFragment } = render(<GenreTable {...props} isFetching />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Genre table with empty data", () => {
    const { asFragment } = render(
      <GenreTable {...props} data={{ items: [] } as any} />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Genre table with data", () => {
    const data = {
      current_page: 0,
      per_page: 10,
      total_pages: 1,
      total_elements: 1,
      items: [
        {
          id: "1",
          name: "Test",
          is_active: false,
          created_at: "2022-10-01T00:00:00",
          deleted_at: null,
        },
      ],
    };
    const { asFragment } = render(<GenreTable {...props} data={data} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correct type", () => {
    const data = {
      current_page: 0,
      per_page: 20,
      total_pages: 1,
      total_elements: 2,
      items: [
        {
          id: "1",
          name: "Test",
          is_active: false,
          created_at: "2022-10-01T00:00:00",
          deleted_at: null,
        },
        {
          id: "2",
          name: "Pedro",
          is_active: true,
          created_at: "2022-10-05T00:00:00",
          deleted_at: "2022-10-09T00:00:00",
        },
      ],
    };
    const { asFragment } = render(<GenreTable {...props} data={data} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
