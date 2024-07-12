import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  MenuItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useEffect, useRef, useState } from "react";
import { ContextMenu } from "types/index";
import { BiRename } from "react-icons/bi";

const Rename = ({ path, name, type }: ContextMenu) => {
  const { backgroundColor, textColor, iconColor, backgroundColorDarker, accentColor } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [newName, setNewName] = useState<string>(name.split(".noted")[0]);
  const [inValidName, setInValidName] = useState<boolean>(false);
  const { rename } = useWorkspace();

  const renameFile = async () => {
    let newPath = "";
    if (name.includes(".noted")) {
      newPath = path.split(name)[0] + newName + ".noted";
    } else if (name.includes(".pdf")) {
      newPath = path.split(name)[0] + newName + ".pdf";
    }

    const res = await rename(path, newPath, type);

    if (!res) {
      setInValidName(true);
      return;
    }
    onClose();
  };

  const renameFolder = async () => {
    const newPath = path.split(name)[0] + newName;
    const res = await rename(path, newPath, type);

    if (!res) {
      setInValidName(true);
      return;
    }
    onClose();
  };

  const handleRename = async () => {
    switch (type) {
      case "file":
        renameFile();
        break;
      case "folder":
        renameFolder();
        break;
    }
  };

  useEffect(() => {
    return () => {
      if (name.includes(".noted")) {
        setNewName(name.split(".noted")[0]);
      } else if (name.includes(".pdf")) {
        setNewName(name.split(".pdf")[0]);
      }
    };
  }, [name]);

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
          bg={backgroundColor}
          color={textColor}
          shadow="md"
        >
          <AlertDialogBody>
            <Input
              value={newName}
              onChange={(e) => {
                setInValidName(false);
                setNewName(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                }
              }}
              isInvalid={inValidName}
              focusBorderColor={inValidName ? "red.300" : accentColor}
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
        m={0}
        onClick={onOpen}
        p={1}
        bg="transparent"
        color={textColor}
        rounded="md"
        px={2}
        _hover={{ bg: backgroundColorDarker }}
        gap={2}
      >
        <BiRename color={iconColor} width={5} height={5} />
        <Text fontSize="sm">Rename</Text>
      </MenuItem>
    </>
  );
};

export default Rename;
