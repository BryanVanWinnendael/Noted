import { IconButton, useDisclosure, Tooltip } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { MdOutlineDraw } from "react-icons/md";
import AddExcalidrawDialog from "./AddExcalidrawDialog";

const AddFile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    iconColor,
    textColor,
    secondaryBackgroundColorLighter,
    secondaryBackgroundColor,
  } = useColors();

  return (
    <>
      <AddExcalidrawDialog onClose={onClose} isOpen={isOpen} />
      <Tooltip
        placement="bottom"
        label={"Create excalidraw file"}
        bg={secondaryBackgroundColorLighter}
        color={textColor}
        rounded="md"
      >
        <IconButton
          onClick={onOpen}
          _hover={{ bg: secondaryBackgroundColor }}
          color={iconColor}
          bg="none"
          w={7}
          h={7}
          aria-label="create file"
          icon={<MdOutlineDraw />}
        />
      </Tooltip>
    </>
  );
};

export default AddFile;
