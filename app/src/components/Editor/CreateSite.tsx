import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react"
import { CiShare2 } from "react-icons/ci";
import useColors from "hooks/useColors";
import EditorJS from "@editorjs/editorjs";
import { useWorkspace } from "contexts/WorkspaceContext";
import SharedModal from "./SharedModal";
import DeleteSharedSite from "./DeleteSharedSite";
import { NoteStyle } from "types/index";
import { utils } from "utils/index";
import { useSettings } from "contexts/SettingsContext";

const CreateSite = ({ editor, path }: { editor:  React.MutableRefObject<EditorJS | null>, path: string }) => {
  const { fontFamily, headerColors } = useSettings()
  const {  
    getBackgroundColor,
    getTextColor,
    getIconColor,
    getAccentColor,
    getBorderColor,
    getMutedTextColor,
    getSecondaryBackgroundColor,
    } = useColors()
  const { notes, createPublicNote } = useWorkspace()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const bg_color = getBackgroundColor()
  const text_color = getTextColor()
  const icon_color = getIconColor()
  const accent_color = getAccentColor()
  const border_color = getBorderColor()
  const muted_text_color = getMutedTextColor()
  const secondary_bg = getSecondaryBackgroundColor()
  const bg_color_right = utils.getLighterColor(
    "0.02",
    secondary_bg,
  );
  const bg_color_left = utils.getDarkerColor(
    "0.03",
    secondary_bg,
  );

  const style: NoteStyle= {
    backgroundColor: bg_color,
    secondaryBackgroundColor: secondary_bg,
    textColor: text_color,
    iconColor: icon_color,
    borderColor: border_color,
    muted: muted_text_color,
    accent: accent_color,
    secondaryBackgroundColorLighter: bg_color_right,
    font: fontFamily,
    secondaryBackgroundColorDarker: bg_color_left,
    headerColors: headerColors
  }

  const isPublic =  notes.find((note) => note.path === path)
  const id = notes.find((note) => note.path === path)?.id

  const handleCreateSite = async () => {
    const data = await editor.current?.save()
    if (!data) return
    createPublicNote(data, path, style)
    onOpen()
  }

  return (
    <>
      {
        isPublic 
        ? 
        <DeleteSharedSite id={id || ""}/>
        :
        <Tooltip 
          placement="bottom"
          label={"share note online"}
          bg={bg_color}
          color={text_color}
          rounded="md">
        <IconButton w="fit" h="fit"
        onClick={handleCreateSite} 
        variant="transparent" 
        aria-label="share-button" 
        icon={<CiShare2 color={icon_color}/>} 
        />
        </Tooltip>
      }
    <SharedModal isOpen={isOpen} onClose={onClose} id={id || ""}/>
    </>
  )
}

export default CreateSite