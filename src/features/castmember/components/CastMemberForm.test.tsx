import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMemberForm } from "./CastMemberForm";

const props = {
  castMember: {
    id: "1",
    name: "Test",
    type: "DIRECTOR",
    created_at: "2022-10-01T00:00:00",
    updated_at: "2022-10-01T00:00:00",
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
};

describe("CastMemberForm", () => {
  it("should render castMember form correctly", () => {
    const { asFragment } = render(<CastMemberForm {...props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMember form with loading state", () => {
    const { asFragment } = render(<CastMemberForm {...props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMember form with disabled state", () => {
    const { asFragment } = render(
      <CastMemberForm {...props} isDisabled isLoading />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
