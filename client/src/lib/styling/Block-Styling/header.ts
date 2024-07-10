import type { HeaderColors } from "@lib/types";

export const headerStyle = (
  text_color: string,
  header_colors: HeaderColors | false,
) => {
  return `
    h1{
      font-size: 4rem !important;
      font-weight: bold !important;
      color: ${header_colors ? header_colors.h1 : text_color} !important;
    }
    h2{
      font-size: 3rem !important;
      font-weight: bold !important;
      color: ${header_colors ? header_colors.h2 : text_color} !important;
    }
    h3{
      font-size: 2rem !important;
      font-weight: bold !important;
      color: ${header_colors ? header_colors.h3 : text_color} !important;
    }
    h4{
      font-size: 1.5rem;
      font-weight: bold;
      color: ${header_colors ? header_colors.h4 : text_color} !important;
    }
    h5{
      font-size: 1.25rem !important;
      font-weight: bold !important;
      color: ${header_colors ? header_colors.h5 : text_color} !important;
    }
    h6{
      font-size: 1.1rem !important;
      font-weight: bold !important;
      color: ${header_colors ? header_colors.h6 : text_color} !important;
    }
  `;
};
