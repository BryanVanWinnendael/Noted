import { IconButton, useDisclosure, Tooltip } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { TbFilePlus } from "react-icons/tb";
import AddFileDialog from "./AddFileDialog";

const AddFile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    iconColor,
    textColor,
    secondaryBackgroundColorLighter,
    secondaryBackgroundColorDarker,
  } = useColors();

  return (
    <>
      <AddFileDialog onClose={onClose} isOpen={isOpen} />
      <Tooltip
        placement="bottom"
        label={"Create file"}
        bg={secondaryBackgroundColorLighter}
        color={textColor}
        rounded="md"
      >
        <IconButton
          onClick={onOpen}
          _hover={{ bg: secondaryBackgroundColorDarker }}
          color={iconColor}
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
