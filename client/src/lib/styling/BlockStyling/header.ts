import type { HeaderColors } from "@lib/types";

export const headerStyle = (
  textColor: string,
  headerColors: HeaderColors | false,
) => {
  return `
    h1{
      font-size: 4rem !important;
      font-weight: bold !important;
      color: ${headerColors ? headerColors.h1 : textColor} !important;
    }
    h2{
      font-size: 3rem !important;
      font-weight: bold !important;
      color: ${headerColors ? headerColors.h2 : textColor} !important;
    }
    h3{
      font-size: 2rem !important;
      font-weight: bold !important;
      color: ${headerColors ? headerColors.h3 : textColor} !important;
    }
    h4{
      font-size: 1.5rem;
      font-weight: bold;
      color: ${headerColors ? headerColors.h4 : textColor} !important;
    }
    h5{
      font-size: 1.25rem !important;
      font-weight: bold !important;
      color: ${headerColors ? headerColors.h5 : textColor} !important;
    }
    h6{
      font-size: 1.1rem !important;
      font-weight: bold !important;
      color: ${headerColors ? headerColors.h6 : textColor} !important;
    }
  `;
};
