import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { GenreEdit } from "./GenreEdit";

const mockGenre = {
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
};

const mockCategories = [
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
];

export const handlers = [
  rest.get(`${baseUrl}/genres/undefined`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json(mockGenre));
  }),
  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.json({ items: mockCategories }));
  }),
  rest.put(`${baseUrl}/genres/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("Create Genre", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreEdit />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit success", async () => {
    renderWithProviders(<GenreEdit />);

    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue(mockGenre.name);
    });

    const submit = screen.getByRole("button", { name: /Save/i });
    fireEvent.change(name, { target: { value: "Test 2" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre updated successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(`${baseUrl}/genres/1`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<GenreEdit />);

    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue(mockGenre.name);
    });

    const submit = screen.getByRole("button", { name: /Save/i });
    fireEvent.change(name, { target: { value: "Test 2" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre not updated");
      expect(text).toBeInTheDocument();
    });
  });
});
