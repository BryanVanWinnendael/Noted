import { IconButton, Tooltip } from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { RiHomeLine } from "react-icons/ri";

const WorkspaceFile = () => {
  const {
    iconColor,
    textColor,
    secondaryBackgroundColorLighter,
    secondaryBackgroundColorDarker,
  } = useColors();
  const { openWorkspaceFile } = useWorkspace();
  const workspace_path = localStorage.getItem("workspace_path");
  const workspace_name = workspace_path?.split("\\").pop() + ".home.noted";
  const workspace_file = workspace_path + "\\" + workspace_name;
  const active_file = localStorage.getItem("active_file");
  const isOpened = active_file === workspace_file;

  const handleOpen = () => {
    openWorkspaceFile();
  };

  return (
    <Tooltip
      placement="bottom"
      label={"Open workspace file"}
      bg={secondaryBackgroundColorLighter}
      color={textColor}
      rounded="md"
    >
      <IconButton
        onClick={handleOpen}
        _hover={{ bg: secondaryBackgroundColorDarker }}
        color={iconColor}
        bg={isOpened ? secondaryBackgroundColorDarker : "transparent"}
        w={7}
        h={7}
        aria-label="Open workspace file"
        icon={<RiHomeLine />}
      />
    </Tooltip>
  );
};

export default WorkspaceFile;
