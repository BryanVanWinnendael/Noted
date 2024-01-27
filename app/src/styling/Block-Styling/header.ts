import { HeaderColors } from "types"

export const headerStyle = (
  header_colors_enabled: boolean,
  headerColors: HeaderColors | false,
  default_text_color: string,
) => {
  return {
    h1: {
      fontSize: "4rem",
      fontWeight: "bold",
      color:
        header_colors_enabled && headerColors
          ? headerColors.h1
          : default_text_color,
    },
    h2: {
      fontSize: "3rem",
      fontWeight: "bold",
      color:
        header_colors_enabled && headerColors
          ? headerColors.h2
          : default_text_color,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "bold",
      color:
        header_colors_enabled && headerColors
          ? headerColors.h3
          : default_text_color,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color:
        header_colors_enabled && headerColors
          ? headerColors.h4
          : default_text_color,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color:
        header_colors_enabled && headerColors
          ? headerColors.h5
          : default_text_color,
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color:
        header_colors_enabled && headerColors
          ? headerColors.h6
          : default_text_color,
    },
  }
}
