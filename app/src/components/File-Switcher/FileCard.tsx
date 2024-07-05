import { Box, Center, Text } from "@chakra-ui/react";
import SmallEditor from "./SmallEditor";
import { AiOutlineFilePdf } from "react-icons/ai";
import useColors from "hooks/useColors";
import { MdOutlineDraw } from "react-icons/md";
import { useWorkspace } from "contexts/WorkspaceContext";

const FileCard = ({
  data,
  path,
  index,
}: {
  data: any;
  path: string;
  index: number;
}) => {
  const { platform } = useWorkspace();
  const { getIconColor } = useColors();

  const icon_color = getIconColor();

  const extension = path.split(".")[path.split(".").length - 1];

  const getFileName = (path: string) => {
    let full_name;

    if (platform === "win32") {
      full_name = path.split("\\");
    } else {
      full_name = path.split("/");
    }

    const name = full_name[full_name.length - 1].split("." + extension)[0];
    return name;
  };

  const getIcon = () => {
    switch (extension) {
      case "pdf":
        return <AiOutlineFilePdf color={icon_color} size={80} />;
      case "excalidraw":
        return <MdOutlineDraw color={icon_color} size={80} />;
      default:
        return <MdOutlineDraw color={icon_color} size={80} />;
    }
  };

  return (
    <Box className="lg:h-[150px] lg:w-[150px] md:h-[100px] md:w-[100px] h-[80px] w-[80px]">
      {extension === "noted" ? (
        <SmallEditor data={data} index={index} />
      ) : (
        <Center w="full" h="full">
          {getIcon()}
        </Center>
      )}
      <Text
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        textAlign="center"
      >
        {getFileName(path)}
      </Text>
    </Box>
  );
};

export default FileCard;
