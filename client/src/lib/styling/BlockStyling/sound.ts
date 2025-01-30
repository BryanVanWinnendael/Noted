export const soundStyle = (borderColor: string) => {
  return `
    .wrapper, .input{
      background-color: transparent !important;
      border-color: ${borderColor} !important;
    }
  `;
};
