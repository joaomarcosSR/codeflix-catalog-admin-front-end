import type { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { AppStore, RootState, setupStore } from "../app/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarProvider>{children}</SnackbarProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
