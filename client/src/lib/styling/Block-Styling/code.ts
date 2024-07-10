export const codeStyle = (background_color: string) => {
  return `
    .codeBoxTextArea, .dark {
      background-color: ${background_color} !important;
    }
    .codeBoxTextArea {
      border-radius: 8px 8px 8px 0 !important;
      overflow-x: scroll !important;
    }
    .codeBoxSelectInput {
      border-radius: 0 0 8px 8px !important;
    }
    .codeBoxHolder {
      margin-bottom: 10px !important;
      background-color: ${background_color} !important;
      border-radius: 8px !important;
    }
  `;
};
