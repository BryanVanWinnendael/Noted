import { utils } from "utils/index";

export const nestedStyle = (
  secondary_background_color: string,
  accent_color: string,
) => {
  const bg_color_right = utils.getLighterColor(
    "0.02",
    secondary_background_color,
  );
  return {
    ".cdx-settings-button:hover": {
      backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
    },
    ".cdx-settings-button--active": {
      color: accent_color,
    },
  };
};
