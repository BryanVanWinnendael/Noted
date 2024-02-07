import { utils } from "utils/index"

export const codeStyle = (
  default_text_color: string,
  background_color: string,
  secondary_background_color: string,
  muted_text_color: string,
  border_color: string,
) => {
  return {
    ".codeflask": {
      color: default_text_color,
    },
    ".editorjs-codeFlask_Wrapper": {
      backgroundColor: background_color,
      border: "none",
    },
    ".codeflask__flatten": {
      overflow: "hidden",
      zIndex: 0,
    },
    ".codeflask.codeflask--has-line-numbers": {
      zIndex: 0,
    },
    ".codeflask__textarea": {
      caretColor: default_text_color,
    },
    ".codeflask__lines": {
      color: muted_text_color,
    },
    ".editorjs-codeFlask_Wrapper .codeflask.codeflask--has-line-numbers:before":
      {
        backgroundColor: secondary_background_color,
      },
    ".editorjs-codeFlask_Wrapper .editorjs-codeFlask_LangDisplay": {
      backgroundColor: secondary_background_color,
      color: muted_text_color,
    },
    ".nice-select": {
      backgroundColor: secondary_background_color,
      color: muted_text_color,
      borderColor: border_color,
    },
    ".nice-select .nice-select-dropdown": {
      backgroundColor: secondary_background_color,
      color: muted_text_color,
      borderColor: border_color,
    },
    ".nice-select .nice-select-search": {
      backgroundColor: secondary_background_color,
      color: muted_text_color,
      borderColor: border_color,
    },
    ".nice-select .option:hover, .nice-select .option.focus, .nice-select .option.selected.focus":
      {
        backgroundColor: utils.getDarkerColor("0.03", background_color),
        color: muted_text_color,
      },
  }
}
