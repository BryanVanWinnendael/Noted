import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import useColors from "hooks/useColors";
import { CiShare2 } from "react-icons/ci";

const DeleteSharedSite = ({ id }: { id: string }) => {
  const { deletePublicNote } = useWorkspaceStore();
  const toast = useToast();
  const { accentColor, backgroundColor, textColor } = useColors();

  const handleDeleteSite = () => {
    if (!id) return;

    const res = deletePublicNote(id);
    if (!res) {
      toast({
        title: "Failed to unshare note",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Note unshared!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Tooltip
      placement="bottom"
      label={"unshare note"}
      bg={backgroundColor}
      color={textColor}
      rounded="md"
    >
      <IconButton
        w="fit"
        h="fit"
        onClick={handleDeleteSite}
        variant="transparent"
        aria-label="share-button"
        icon={<CiShare2 color={accentColor} />}
      />
    </Tooltip>
  );
};

export default DeleteSharedSite;
