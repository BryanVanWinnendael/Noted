import { resetHeaders } from 'styling'
import { RichUtils } from 'draft-js'
import { CommandsList, CommandArgs } from 'types'


export const COMMANDS: CommandsList[] = [
  {
    name: "Open File",
    callback: (args: CommandArgs) => {
      args.fileContext.OpenFile()
    },
    shortcut: "ctrl + o"
  },
  {
    name: "Save File",
    callback: (args: CommandArgs) => {
      args.fileContext.SaveFile()
    },
    shortcut: "ctrl + s"
  },
  {
    name: "New File",
    callback: (args: CommandArgs) => {
      args.fileContext.NewFile()
    },
    shortcut: "ctrl + n"
  },
  {
    name: "New Tab",
    callback: (args: CommandArgs) => {
      args.fileContext.addTab()
    }
  },
  {
    name: "Enable/ disable side toolbar",
    callback: (args: CommandArgs) => {
      const flag = !args.settingsContext.sideToolbar
      args.settingsContext.setSideToolbar(flag)
      localStorage.setItem("sidetoolbar", String(flag))
    }
  },
  {
    name: "Enable/ disable inline toolbar",
    callback: (args: CommandArgs) => {
      const flag = !args.settingsContext.inlineToolbar
      args.settingsContext.setInlineToolbar(flag)
      localStorage.setItem("inlinetoolbar", String(flag))
    }
  },
  {
    name: "Heading 1",
    callback: (args: CommandArgs) => {
      const newEditorState = RichUtils.toggleBlockType(args.editorContext.editor, "header-one")
      args.editorContext.setEditor(newEditorState)
    }
  },
  {
    name: "Heading 2",
    callback: (args: CommandArgs) => {
      const newEditorState = RichUtils.toggleBlockType(args.editorContext.editor, "header-two")
      args.editorContext.setEditor(newEditorState)
    }
  },
  {
    name: "Heading 3",
    callback: (args: CommandArgs) => {
      const newEditorState = RichUtils.toggleBlockType(args.editorContext.editor, "header-three")
      args.editorContext.setEditor(newEditorState)
    }
  },
  {
    name: "Heading 4",
    callback: (args: CommandArgs) => {
      const newEditorState = RichUtils.toggleBlockType(args.editorContext.editor, "header-four")
      args.editorContext.setEditor(newEditorState)
    }
  },
  {
    name: "Heading 5",
    callback: (args: CommandArgs) => {
      const newEditorState = RichUtils.toggleBlockType(args.editorContext.editor, "header-five")
      args.editorContext.setEditor(newEditorState)
    }
  },
  {
    name: "Heading 6",
    callback: (args: CommandArgs) => {
      const newEditorState = RichUtils.toggleBlockType(args.editorContext.editor, "header-six")
      args.editorContext.setEditor(newEditorState)
    }
  },
  {
    name: "Enable/ disable rainbow headers",
    callback: (args: CommandArgs) => {
      const flag: boolean = !args.settingsContext.customHeadersEnabled
      const text_flag: string = String(flag)
      localStorage.setItem("customHeadersEnabled", text_flag)
      args.settingsContext.setCustomHeadersEnabled(flag)
      if (!flag) args.settingsContext.setHeaderColors(false)
      else args.settingsContext.setHeaderColors(resetHeaders())
    }
  }
]