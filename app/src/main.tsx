import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { WorkspaceProvider } from "contexts/WorkspaceContext";
import { SettingsProvider } from "contexts/SettingsContext";
import { WidgetProvider } from "contexts/WidgetContext";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { ComponentStyleConfig } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { EditorProvider } from "contexts/EditorContext";
import FontWrapper from "styling/FontWrapper";
import { SlashProvider } from "contexts/SlashContext";

const Link: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "lg",
    _focus: {
      boxShadow: "2px 2px 4px teal",
    },
    _focusVisible: {
      color: "gray.100",
      background: "gray.700",
      textDecoration: "underline",
    },
  },
};

const theme = extendTheme({
  components: {
    Popover: {
      variants: {
        picker: {
          popper: {
            maxWidth: "unset",
            width: "unset",
          },
        },
      },
    },
    Link,
  },
  styles: {
    global: {
      ".js-focus-visible :focus:not([data-focus-visible-added])": {
        outline: "none",
        boxShadow: "none",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <WidgetProvider>
      <SettingsProvider>
        <WorkspaceProvider>
          <EditorProvider>
            <ChakraProvider
              theme={theme}
              toastOptions={{ defaultOptions: { position: "bottom-right" } }}
            >
              <FontWrapper>
                <SlashProvider>
                  <App />
                </SlashProvider>
              </FontWrapper>
            </ChakraProvider>
          </EditorProvider>
        </WorkspaceProvider>
      </SettingsProvider>
    </WidgetProvider>
  </React.StrictMode>,

  document.getElementById("root"),
);

// Remove loading screen
postMessage({ payload: "removeLoading" }, "*");
