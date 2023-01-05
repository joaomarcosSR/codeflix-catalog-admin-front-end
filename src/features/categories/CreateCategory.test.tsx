import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CategoryCreate } from "./CreateCategory";

export const handlers = [
  rest.post(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("Create category", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryCreate />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit success", async () => {
    renderWithProviders(<CategoryCreate />);

    const name = screen.getByTestId("textFieldName");
    const description = screen.getByTestId("textFieldDescription");
    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.change(description, { target: { value: "Test description" } });

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category created successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CategoryCreate />);

    const name = screen.getByTestId("textFieldName");
    const description = screen.getByTestId("textFieldDescription");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.change(description, { target: { value: "Test description" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category not created");
      expect(text).toBeInTheDocument();
    });
  });
});
