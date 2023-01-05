import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CastMemberCreate } from "./CreateCastMember";

export const handlers = [
  rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("Create cast member", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit success", async () => {
    renderWithProviders(<CastMemberCreate />);

    const name = screen.getByTestId("name");
    const type = screen.getByText("Actor");
    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(type);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("CastMember created successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CastMemberCreate />);

    const name = screen.getByTestId("name");
    const type = screen.getByText("Diretor");
    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(type);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("CastMember not created");
      expect(text).toBeInTheDocument();
    });
  });
});
