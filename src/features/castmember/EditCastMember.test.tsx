import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CastMemberEdit } from "./EditCastMember";

const data = {
  id: "1",
  name: "Pedro",
  type: "DIRECTOR",
  created_at: "2022-12-24T00:49:09.326592Z",
};

export const handlers = [
  rest.get(`${baseUrl}/cast_members/undefined`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json(data));
  }),
  rest.put(`${baseUrl}/cast_members/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("Edit cast member", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMemberEdit />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CastMemberEdit />);

    const name = screen.getByTestId("name");
    const type = screen.getByText("Actor");

    await waitFor(() => {
      expect(name).toHaveValue(data.name);
    });

    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(type);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("CastMember updated successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(`${baseUrl}/cast_members/1`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CastMemberEdit />);

    const name = screen.getByTestId("name");
    const type = screen.getByText("Actor");

    await waitFor(() => {
      expect(name).toHaveValue(data.name);
    });

    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(type);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("CastMember not updated.");
      expect(text).toBeInTheDocument();
    });
  });
});
