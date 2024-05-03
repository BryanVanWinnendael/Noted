export const codeStyle = (background_color: string) => {
  return {
    ".codeBoxTextArea, .dark": {
      backgroundColor: background_color,
    },
    ".codeBoxTextArea": {
      borderRadius: "8px 8px 8px 0",
      overflowX: "scroll",
    },
    ".codeBoxSelectInput": {
      borderRadius: "0 0 8px 8px",
    },
    ".codeBoxHolder": {
      marginBottom: "10px",
      backgroundColor: background_color,
      borderRadius: "8px",
    },
  }
}
