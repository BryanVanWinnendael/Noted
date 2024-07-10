export const nestedStyle = (
  secondary_background_color: string,
  accent_color: string,
) => {
  return `
    .cdx-settings-button:hover{
      background-color: ${secondary_background_color} !important;
    }
    .cdx-settings-button--active{
      color: ${accent_color} !important;
    }
  `;
};
