import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useRef } from "react";
import { ContextMenu } from "types/index";
import { utils } from "utils/index";
import { MdDeleteOutline } from "react-icons/md";

const Delete = ({ path, name, type }: ContextMenu) => {
  const {
    getTextColor,
    getSecondaryBackgroundColor,
    getBackgroundColor,
    getIconColor,
  } = useColors();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteFile, deleteFolder } = useWorkspace();

  const bg_colorLeft = getSecondaryBackgroundColor();
  const bg_color = getBackgroundColor();
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color);
  const text_color = getTextColor();
  const icon_color = getIconColor();

  const handleDelete = () => {
    switch (type) {
      case "file":
        deleteFile(path);
        break;
      case "folder":
        deleteFolder(path);
        break;
    }
    onClose();
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={bg_color} color={text_color} shadow="md">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {type} {name.split(".noted")[0]}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                _hover={{ opacity: 0.6 }}
                borderColor={bg_colorLeft}
                variant="outline"
                ref={cancelRef as any}
                onClick={onClose}
                color={text_color}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
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
        <MdDeleteOutline color={icon_color} width={5} height={5} />
        <Text fontSize="sm">Delete</Text>
      </MenuItem>
    </>
  );
};

export default Delete;
