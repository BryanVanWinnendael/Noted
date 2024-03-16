import { Box, Center, Text } from "@chakra-ui/react"
import SmallEditor from "./SmallEditor"
import { AiOutlineFilePdf } from "react-icons/ai"
import useColors from "hooks/useColors"

const FileCard = ({
  data,
  path,
  index,
}: {
  data: any
  path: string
  index: number
}) => {
  const { getIconColor } = useColors()

  const icon_color = getIconColor()

  const extension = path.split(".")[path.split(".").length - 1]
  const getFileName = (path: string) => {
    const full_name = path.split("\\")
    const name = full_name[full_name.length - 1].split(".noted")[0]
    return name
  }
  return (
    <Box className="lg:h-[150px] lg:w-[150px] md:h-[100px] md:w-[100px] h-[80px] w-[80px]">
      {extension === "noted" && <SmallEditor data={data} index={index} />}
      {extension === "pdf" && (
        <Center w="full" h="full">
          <AiOutlineFilePdf color={icon_color} size={80} />
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
  )
}

export default FileCard
