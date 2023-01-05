import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CategoryEdit } from "./EditCategory";

const data = {
  is_active: true,
  created_at: "2022-12-23T13:53:22.999118Z",
  deleted_at: null,
  id: "1",
  name: "Antonio",
  description: "Ficar de olho",
};

export const handles = [
  rest.get(`${baseUrl}/categories/undefined`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json(data));
  }),
  rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handles);

describe("Edit category", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryEdit />);

    const name = screen.getByTestId("textFieldName");
    const description = screen.getByTestId("textFieldDescription");
    const isActive = screen.getByTestId("is_active");

    await waitFor(() => {
      expect(name).toHaveValue(data.name);
    });

    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Category 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category updated successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CategoryEdit />);

    const name = screen.getByTestId("textFieldName");
    const description = screen.getByTestId("textFieldDescription");
    const isActive = screen.getByTestId("is_active");

    await waitFor(() => {
      expect(name).toHaveValue(data.name);
    });
    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Category 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category not updated.");
      expect(text).toBeInTheDocument();
    });
  });
});
