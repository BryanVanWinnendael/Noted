import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CiShare2 } from "react-icons/ci";
import useColors from "hooks/useColors";
import EditorJS from "@editorjs/editorjs";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import SharedModal from "./SharedModal";
import DeleteSharedSite from "./DeleteSharedSite";
import { NoteStyle } from "types/index";
import { useSettingsStore } from "stores/SettingsStore";

const CreateSite = ({
  editor,
  path,
}: {
  editor: React.MutableRefObject<EditorJS | null>;
  path: string;
}) => {
  const { fontFamily, headerColors, headerColorsEnabled } = useSettingsStore();
  const {
    backgroundColor,
    textColor,
    iconColor,
    accentColor,
    borderColor,
    mutedTextColor,
    secondaryBackgroundColor,
    secondaryBackgroundColorLighter,
    secondaryBackgroundColorDarker,
  } = useColors();
  const { notes, createPublicNote } = useWorkspaceStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const style: NoteStyle = {
    backgroundColor,
    secondaryBackgroundColor,
    secondaryBackgroundColorLighter,
    secondaryBackgroundColorDarker,
    textColor,
    iconColor,
    borderColor,
    muted: mutedTextColor,
    accent: accentColor,
    font: fontFamily,
    headerColors: headerColorsEnabled ? headerColors : false,
  };

  const isPublic = notes.find((note) => note.path === path);
  const id = notes.find((note) => note.path === path)?.id;

  const handleCreateSite = async () => {
    const data = await editor.current?.save();
    if (!data) return;
    const created = await createPublicNote(data, path, style);
    if (created) onOpen();
  };

  return (
    <>
      {isPublic ? (
        <DeleteSharedSite id={id || ""} />
      ) : (
        <Tooltip
          placement="bottom"
          label={"share note online"}
          bg={backgroundColor}
          color={textColor}
          rounded="md"
        >
          <IconButton
            w="fit"
            h="fit"
            onClick={handleCreateSite}
            variant="transparent"
            aria-label="share-button"
            icon={<CiShare2 color={iconColor} />}
          />
        </Tooltip>
      )}
      <SharedModal isOpen={isOpen} onClose={onClose} id={id || ""} />
    </>
  );
};

export default CreateSite;
