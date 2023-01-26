import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { GenreList } from "./GenreList";
import { genreResponse, genreResponsePage2 } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/genres`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "1") {
      return res(ctx.json(genreResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(genreResponse), ctx.delay(150));
  }),
  rest.delete(
    `${baseUrl}/genres/${genreResponse.items[0].id}`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("List genre", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreList />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<GenreList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText(genreResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/genres`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText("Error fetching genres");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle on page change", async () => {
    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText(genreResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText(genreResponsePage2.items[0].name);
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText(genreResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");
    fireEvent.change(input, {
      target: {
        value: "Terror",
      },
    });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle delete genre success", async () => {
    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText(genreResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const notification = screen.getByText("Genre deleted successfully");
      expect(notification).toBeInTheDocument();
    });
  });

  it("should handle delete genre error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/genres/${genreResponse.items[0].id}`,
        (_, res, ctx) => {
          return res(ctx.delay(150), ctx.status(500));
        }
      )
    );

    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText(genreResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const notification = screen.getByText("Genre not deleted");
      expect(notification).toBeInTheDocument();
    });
  });
});
