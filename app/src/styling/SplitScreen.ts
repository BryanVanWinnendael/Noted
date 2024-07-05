import { utils } from "utils/index";

export const splitScreen = (muted_text_color: string) => {
  return {
    ".sash-module_sash__K-9lB:before": {
      backgroundColor: utils.getTransparent(0.2, muted_text_color),
    },
  };
};
