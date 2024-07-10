import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { useWorkspace } from 'contexts/WorkspaceContext'
import useColors from 'hooks/useColors';
import { CiShare2 } from 'react-icons/ci';

const DeleteSharedSite = ({id}: {id: string}) => {
  const { deletePublicNote } = useWorkspace()
  const toast = useToast();
  const { getAccentColor, getBackgroundColor, getTextColor } = useColors()

  const accent_color = getAccentColor()
  const bg_color = getBackgroundColor()
  const text_color = getTextColor()


  const handleDeleteSite = () => {
    if (!id) return
    deletePublicNote(id)
    toast({
      title: 'Note unshared!',
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Tooltip 
      placement="bottom"
      label={"unshare note"}
      bg={bg_color}
      color={text_color}
      rounded="md">
    <IconButton
     w="fit" h="fit" onClick={handleDeleteSite} variant="transparent" aria-label="share-button" 
      icon={<CiShare2 color={accent_color}/>} />
      </Tooltip>
  )
}

export default DeleteSharedSite