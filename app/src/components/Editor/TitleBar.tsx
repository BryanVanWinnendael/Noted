import { Flex, Grid, Text } from '@chakra-ui/react'
import CreateSite from 'components/Editor/CreateSite'
import { useSettings } from 'contexts/SettingsContext';
import useColors from 'hooks/useColors';
import EditorJS from "@editorjs/editorjs";


const TitleBar = ({ isHomeFile, filename, editor, path }: { isHomeFile: boolean,filename: string, editor:  React.MutableRefObject<EditorJS | null>, path: string}) => {
  const { editorTitle } = useSettings();
  const { getTextColor, getBorderColor } = useColors();

  const text_color = getTextColor();
  const border_color = getBorderColor();

  return (
    editorTitle ? 
    <Grid templateColumns='repeat(3, 1fr)' p={1} w="full" borderBottom="1px" borderColor={border_color}>
    <Text></Text>
    <Text
      opacity={0.6}
      color={text_color}
      textAlign="center"
      pl="4rem"
      fontSize="md"
    >
      {isHomeFile ? "Home" : filename}
    </Text>
    <Flex alignItems="center" justifyContent="flex-end" mr={2}> <CreateSite editor={editor} path={path}/></Flex>
  </Grid>
    :  <Flex alignItems="center" justifyContent="flex-end" m={2}> <CreateSite editor={editor} path={path}/></Flex>
  )
}

export default TitleBar