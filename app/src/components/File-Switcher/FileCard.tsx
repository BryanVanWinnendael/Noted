import { Box, Text } from "@chakra-ui/react"
import SmallEditor from "./SmallEditor"

const FileCard = ({
  data,
  path,
  index,
}: {
  data: any
  path: string
  index: number
}) => {
  const getFileName = (path: string) => {
    const full_name = path.split("\\")
    const name = full_name[full_name.length - 1].split(".noted")[0]
    return name
  }

  return (
    <Box className="lg:h-[150px] lg:w-[150px] md:h-[100px] md:w-[100px] h-[80px] w-[80px]">
      <SmallEditor data={data} index={index} />
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
