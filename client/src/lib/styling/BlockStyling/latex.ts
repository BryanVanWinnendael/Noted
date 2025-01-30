export const latexStyle = (iconColor: string, mutedTextColor: string) => {
  return `
    .math-input {
      background-color: transparent !important;
      outline: none !important;
    }
    .css-k82r66, .ce-popover-item__icon {
      fill: ${iconColor} !important;
    }
    .ce-popover-item__secondary-title {
      color: ${mutedTextColor} !important;
    }
  `;
};
