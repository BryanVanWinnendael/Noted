export const nestedStyle = (
  secondaryBackgroundColor: string,
  accentColor: string,
) => {
  return `
    .cdx-settings-button:hover{
      background-color: ${secondaryBackgroundColor} !important;
    }
    .cdx-settings-button--active{
      color: ${accentColor} !important;
    }
  `;
};
