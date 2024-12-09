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
import { useWorkspaceStore } from "stores/WorkspaceStore";
import useColors from "hooks/useColors";
import { useRef } from "react";
import { ContextMenu } from "types/index";
import { MdDeleteOutline } from "react-icons/md";

const Delete = ({ path, name, type }: ContextMenu) => {
  const {
    textColor,
    secondaryBackgroundColor,
    backgroundColor,
    iconColor,
    backgroundColorDarker,
  } = useColors();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteFile, deleteFolder } = useWorkspaceStore();

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
          <AlertDialogContent
            bg={backgroundColor}
            color={textColor}
            shadow="md"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {type} {name.split(".noted")[0]}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                _hover={{ opacity: 0.6 }}
                borderColor={secondaryBackgroundColor}
                variant="outline"
                ref={cancelRef as any}
                onClick={onClose}
                color={textColor}
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
        color={textColor}
        rounded="md"
        px={2}
        _hover={{ bg: backgroundColorDarker }}
        gap={2}
      >
        <MdDeleteOutline color={iconColor} width={5} height={5} />
        <Text fontSize="sm">Delete</Text>
      </MenuItem>
    </>
  );
};

export default Delete;
