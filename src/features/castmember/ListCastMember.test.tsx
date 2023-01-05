import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { castMemberResponse, castMemberResponsePage2 } from "./mocks";
import { CastMemberList } from "./ListCastMember";

export const handlers = [
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "1") {
      return res(ctx.json(castMemberResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(castMemberResponse), ctx.delay(150));
  }),
  rest.delete(
    `${baseUrl}/cast_members/${castMemberResponse.items[0].id}`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("List cast member", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMemberList />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<CastMemberList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText(castMemberResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText("Error fetching CastMembers");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle on page change", async () => {
    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText(castMemberResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText(castMemberResponsePage2.items[0].name);
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText(castMemberResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");
    fireEvent.change(input, {
      target: {
        value: "Ma",
      },
    });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle delete cast member success", async () => {
    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText(castMemberResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const notification = screen.getByText("CastMember deleted successfully");
      expect(notification).toBeInTheDocument();
    });
  });

  it("should handle delete cast member error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/cast_members/${castMemberResponse.items[0].id}`,
        (_, res, ctx) => {
          return res(ctx.delay(150), ctx.status(500));
        }
      )
    );

    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText(castMemberResponse.items[0].name);
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const notification = screen.getByText("CastMember not deleted");
      expect(notification).toBeInTheDocument();
    });
  });
});
