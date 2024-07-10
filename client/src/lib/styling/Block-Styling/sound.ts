export const soundStyle = (border_color: string) => {
  return `
    .wrapper, .input{
      background-color: transparent !important;
      border-color: ${border_color} !important;
    }
  `;
};
