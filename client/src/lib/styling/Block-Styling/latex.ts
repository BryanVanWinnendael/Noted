export const latexStyle = (icon_color: string, muted_text_color: string) => {
  return `
    .math-input {
      background-color: transparent !important;
      outline: none !important;
    }
    .css-k82r66, .ce-popover-item__icon {
      fill: ${icon_color} !important;
    }
    .ce-popover-item__secondary-title {
      color: ${muted_text_color} !important;
    }
  `;
};
