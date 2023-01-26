import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../categories/mocks";
import { GenreCreate } from "./GenreCreate";

export const handlers = [
  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.json(categoryResponse));
  }),
  rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("Create Genre", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreCreate />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit success", async () => {
    renderWithProviders(<GenreCreate />);

    const name = screen.getByTestId("name");
    const submit = screen.getByRole("button", { name: /Save/i });

    await waitFor(() => {
      expect(submit).toBeInTheDocument();
    });

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre created successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<GenreCreate />);

    const name = screen.getByTestId("name");
    const submit = screen.getByRole("button", { name: /Save/i });

    await waitFor(() => {
      expect(submit).toBeInTheDocument();
    });

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre not created");
      expect(text).toBeInTheDocument();
    });
  });
});
