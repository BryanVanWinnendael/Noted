import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Input,
  useDisclosure,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useRef, useState } from "react";
import { TbFilePlus } from "react-icons/tb";
import { utils } from "utils/index";

const AddFile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    getSecondaryBackgroundColor,
    getIconColor,
    getAccentColor,
    getTextColor,
  } = useColors();
  const cancelRef = useRef();
  const [fileName, setFileName] = useState<string>("");
  const [inValidName, setInValidName] = useState<boolean>(false);
  const { activeFolder, makeNewFile } = useWorkspace();

  const accent_color = getAccentColor();
  const icon_color = getIconColor();
  const text_color = getTextColor();
  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color = utils.getLighterColor("0.02", secondary_background_color);

  const handleCreateFile = async () => {
    if (fileName === "") {
      setInValidName(true);
      return;
    }
    const folderPath = activeFolder || "";
    const filename = fileName + ".noted";
    const res = await makeNewFile(filename, folderPath);
    if (!res) {
      setInValidName(true);
      return;
    }
    setFileName("");
    onClose();
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          bg={bg_color}
          color={utils.getTextColor(bg_color)}
          shadow="md"
        >
          <AlertDialogBody>
            <Input
              value={fileName}
              onChange={(e) => {
                setInValidName(false);
                setFileName(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateFile();
                }
              }}
              isInvalid={inValidName}
              focusBorderColor={inValidName ? "red.300" : accent_color}
              errorBorderColor="red.300"
              placeholder="Choose a file name"
            />
            {inValidName && (
              <Text mt={1} color="red.200">
                Name is already in use or in invalid
              </Text>
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <Tooltip
        placement="bottom"
        label={"Create file"}
        bg={bg_color}
        color={text_color}
        rounded="md"
      >
        <IconButton
          onClick={onOpen}
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
          color={icon_color}
          bg="none"
          w={7}
          h={7}
          aria-label="create file"
          icon={<TbFilePlus />}
        />
      </Tooltip>
    </>
  );
};

export default AddFile;
