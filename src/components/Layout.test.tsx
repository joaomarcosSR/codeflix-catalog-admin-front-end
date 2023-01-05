import { Typography } from "@mui/material";
import { render } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout", () => {
  it("should render Layout correctly", () => {
    const { asFragment } = render(
      <Layout>
        <Typography>Olá</Typography>
      </Layout>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
