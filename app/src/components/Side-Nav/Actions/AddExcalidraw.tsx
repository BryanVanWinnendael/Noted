import { IconButton, useDisclosure, Tooltip } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { MdOutlineDraw } from "react-icons/md";
import { utils } from "utils/index";
import AddExcalidrawDialog from "./AddExcalidrawDialog";

const AddFile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getSecondaryBackgroundColor, getIconColor, getTextColor } =
    useColors();

  const icon_color = getIconColor();
  const text_color = getTextColor();
  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color = utils.getLighterColor("0.02", secondary_background_color);

  return (
    <>
      <AddExcalidrawDialog onClose={onClose} isOpen={isOpen} />
      <Tooltip
        placement="bottom"
        label={"Create excalidraw file"}
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
          icon={<MdOutlineDraw />}
        />
      </Tooltip>
    </>
  );
};

export default AddFile;
