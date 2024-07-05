import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  useDisclosure,
  Text,
  MenuItem,
} from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useRef, useState } from "react";
import { ContextMenu } from "types/index";
import { utils } from "utils/index";
import { CgFileAdd } from "react-icons/cg";

const AddFile = ({ path, type }: ContextMenu) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAccentColor, getBackgroundColor, getTextColor, getIconColor } =
    useColors();
  const cancelRef = useRef();
  const [fileName, setFileName] = useState<string>("");
  const [inValidName, setInValidName] = useState<boolean>(false);
  const { makeNewFile } = useWorkspace();

  const accent_color = getAccentColor();
  const bg_color = getBackgroundColor();
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color);
  const text_color = getTextColor();
  const icon_color = getIconColor();

  const handleAddToFile = async () => {
    const folderPath = path.split("\\").slice(0, -1).join("\\");
    const filename = fileName + ".noted";
    const res = await makeNewFile(filename, folderPath);
    if (!res) {
      setInValidName(true);
      return;
    }
    setFileName("");
    onClose();
  };

  const handleAddToFolder = async () => {
    const folderPath = path;
    const filename = fileName + ".noted";
    const res = await makeNewFile(filename, folderPath);
    if (!res) {
      setInValidName(true);
      return;
    }
    setFileName("");
    onClose();
  };

  const handleAdd = async () => {
    if (fileName === "") {
      setInValidName(true);
      return;
    }

    if (type === "file") {
      handleAddToFile();
    } else {
      handleAddToFolder();
    }
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
                  handleAdd();
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
      <MenuItem
        onClick={onOpen}
        m={0}
        p={1}
        bg="transparent"
        color={text_color}
        rounded="md"
        px={2}
        _hover={{ bg: utils.getDarkerColor("0.03", bg_color_lighter) }}
        gap={2}
      >
        <CgFileAdd color={icon_color} width={5} height={5} />
        <Text fontSize="sm">Add File</Text>
      </MenuItem>
    </>
  );
};

export default AddFile;
