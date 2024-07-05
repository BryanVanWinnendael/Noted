import { Box, Button, Flex, Tooltip } from "@chakra-ui/react";
import { CanvasTools } from "types/index";
import { LuPencil } from "react-icons/lu";
import useColors from "hooks/useColors";
import { utils } from "utils/index";
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
  const { getTextColor, getBackgroundColor } = useColors();

  const text_color = getTextColor();
  const bg_color = getBackgroundColor();

  return (
    <Flex justifyContent="space-between">
      <Box>
        <Tooltip
          placement="bottom"
          label={"Draw"}
          bg={bg_color}
          color={text_color}
          rounded="md"
        >
          <Button
            _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
            color={text_color}
            bg={
              tool === "pencil"
                ? utils.getDarkerColor("0.03", bg_color)
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
          bg={bg_color}
          color={text_color}
          rounded="md"
        >
          <Button
            _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
            color={text_color}
            bg={
              tool === "text"
                ? utils.getDarkerColor("0.03", bg_color)
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
        bg={bg_color}
        color={text_color}
        rounded="md"
      >
        <Button
          isLoading={saving}
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
          color={text_color}
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
