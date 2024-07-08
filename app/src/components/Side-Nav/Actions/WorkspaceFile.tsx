import { IconButton, Tooltip } from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { RiHomeLine } from "react-icons/ri";
import { utils } from "utils/index";

const WorkspaceFile = () => {
  const { getSecondaryBackgroundColor, getIconColor, getTextColor } =
    useColors();
  const { openWorkspaceFile } = useWorkspace();
  const workspace_path = localStorage.getItem("workspace_path");
  const workspace_name = workspace_path?.split("\\").pop() + ".home.noted";
  const workspace_file = workspace_path + "\\" + workspace_name;
  const active_file = localStorage.getItem("active_file");
  const isOpened = active_file === workspace_file;

  const icon_color = getIconColor();
  const text_color = getTextColor();
  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color = utils.getLighterColor("0.02", secondary_background_color);

  const handleOpen = () => {
    openWorkspaceFile();
  };

  return (
    <Tooltip
      placement="bottom"
      label={"Open workspace file"}
      bg={bg_color}
      color={text_color}
      rounded="md"
    >
      <IconButton
        onClick={handleOpen}
        _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
        color={icon_color}
        bg={isOpened ? utils.getDarkerColor("0.03", bg_color) : "transparent"}
        w={7}
        h={7}
        aria-label="Open workspace file"
        icon={<RiHomeLine />}
      />
    </Tooltip>
  );
};

export default WorkspaceFile;
