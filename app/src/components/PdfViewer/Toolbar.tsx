import { Box, Button, Flex, Tooltip } from "@chakra-ui/react";
import { CanvasTools } from "types/index";
import { LuPencil } from "react-icons/lu";
import useColors from "hooks/useColors";
import { MdTextFields } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

const Toolbar = ({
  toggleHandTool,
  tool,
  handleSave,
  saving,
}: {
  toggleHandTool: (tool: CanvasTools) => void;
  tool: CanvasTools;
  handleSave: () => void;
  saving: boolean;
}) => {
  const { textColor, backgroundColor, backgroundColorDarker } = useColors();

  return (
    <Flex justifyContent="space-between">
      <Box>
        <Tooltip
          placement="bottom"
          label={"Draw"}
          bg={backgroundColor}
          color={textColor}
          rounded="md"
        >
          <Button
            _hover={{ backgroundColorDarker }}
            color={textColor}
            bg={
              tool === "pencil"
                ? backgroundColorDarker
                : "transparent"
            }
            leftIcon={<LuPencil />}
            onClick={() => toggleHandTool("pencil")}
          >
            Draw
          </Button>
        </Tooltip>
        <Tooltip
          placement="bottom"
          label={"Add text"}
          bg={backgroundColor}
          color={textColor}
          rounded="md"
        >
          <Button
            _hover={{ bg: backgroundColorDarker }}
            color={textColor}
            bg={
              tool === "text"
                ? backgroundColorDarker
                : "transparent"
            }
            onClick={() => toggleHandTool("text")}
          >
            <MdTextFields />
          </Button>
        </Tooltip>
      </Box>

      <Tooltip
        placement="bottom"
        label={"Ctrl+Shift+S"}
        bg={backgroundColor}
        color={textColor}
        rounded="md"
      >
        <Button
          isLoading={saving}
          _hover={{ bg: backgroundColorDarker }}
          color={textColor}
          bg="transparent"
          onClick={handleSave}
        >
          <FaRegSave />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default Toolbar;
