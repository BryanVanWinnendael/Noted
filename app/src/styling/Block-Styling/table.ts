import { utils } from "utils/index";

export const tableStyle = (
  background_color: string,
  secondary_background_color: string,
  muted_text_color: string,
  border_color: string,
) => {
  const bg_color_right = utils.getLighterColor(
    "0.02",
    secondary_background_color,
  );

  return {
    ".tc-wrap": {
      width: "90%",
    },
    ".tc-popover": {
      backgroundColor: secondary_background_color,
      color: muted_text_color,
      borderColor: border_color,
    },
    ".tc-popover__item-icon": {
      backgroundColor: background_color,
    },
    ".tc-cell--selected": {
      backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
    },
    ".tc-cell, .tc-row, .tc-table, .tc-add-column,.tc-row:after": {
      borderColor: border_color,
    },
    ".tc-add-column, .tc-add-row": {
      color: muted_text_color,
    },
    ".tc-add-column:hover, .tc-add-row:hover, .tc-add-row:hover:before": {
      backgroundColor: secondary_background_color,
    },
  };
};
