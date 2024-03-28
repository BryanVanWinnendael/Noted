export const codeStyle = (background_color: string) => {
  return {
    ".codeBoxTextArea, .dark": {
      backgroundColor: background_color,
    },
    ".codeBoxTextArea": {
      borderRadius: "8px 8px 8px 0",
    },
    ".codeBoxSelectInput": {
      borderRadius: "0 0 8px 8px",
    },
  }
}
