import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoriesTable } from "./CategoryTable";

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

describe("CastMemberTable", () => {
  it("should render CastMember table correctly", () => {
    const { asFragment } = render(<CategoriesTable {...props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMember table with loading", () => {
    const { asFragment } = render(<CategoriesTable {...props} isFetching />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMember table with empty data", () => {
    const { asFragment } = render(
      <CategoriesTable {...props} data={{ items: [] } as any} />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMember table with data", () => {
    const data = {
      current_page: 0,
      per_page: 10,
      total_pages: 1,
      total_elements: 1,
      items: [
        {
          id: "1",
          name: "Test",
          description: "Description test",
          is_active: false,
          created_at: "2022-10-01T00:00:00",
          deleted_at: null,
        },
      ],
    };
    const { asFragment } = render(<CategoriesTable {...props} data={data} />, {
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
          description: "Description test",
          is_active: false,
          created_at: "2022-10-01T00:00:00",
          deleted_at: null,
        },
        {
          id: "2",
          name: "Pedro",
          description: "Description Pedro",
          is_active: true,
          created_at: "2022-10-05T00:00:00",
          deleted_at: "2022-10-09T00:00:00",
        },
      ],
    };
    const { asFragment } = render(<CategoriesTable {...props} data={data} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
