import { IconButton, Tooltip } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import { CreatePublicNote } from "utils/actions/notes/create"
import { CiShare2 } from "react-icons/ci";
import useColors from "hooks/useColors";
import EditorJS from "@editorjs/editorjs";

const CreateSite = ({ editor }: { editor:  React.MutableRefObject<EditorJS | null> }) => {
  const { getBackgroundColor, getTextColor } = useColors()
  const { user } = useWorkspace()

  const bg_color = getBackgroundColor()
  const text_color = getTextColor()

  const handleCreateSite = async () => {
    console.log(user)
    const idToken = await user?.getIdToken()
    if (!idToken) return
    const data = await editor.current?.save()
    if (!data) return
    CreatePublicNote(idToken, data)
  }

  return (
    <Tooltip 
    placement="bottom"
    label={"share note online"}
    bg={bg_color}
    color={text_color}
    rounded="md">
      <IconButton w="fit" h="fit" onClick={handleCreateSite} variant="transparent" aria-label="share-button" icon={<CiShare2 />} />
    </Tooltip>
  )
}

export default CreateSite