import React, { useState } from "react";
import { WorkspaceType } from "types";
import FileButton from "./FileButton";
import FolderButton from "./FolderButton";
import { Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "stores/WorkspaceStore";

interface TreeViewProps {
  items: WorkspaceType[];
}

const TreeView: React.FC<TreeViewProps> = ({ items }) => {
  const { platform } = useWorkspaceStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const workspace_path = localStorage.getItem("workspace_path");
  const homeName =
    platform === "win32"
      ? workspace_path?.split("\\").pop() + ".home"
      : workspace_path?.split("/").pop() + ".home";

  const toggleItem = (itemId: string) => {
    setExpandedItems((prevState) =>
      prevState.includes(itemId)
        ? prevState.filter((id) => id !== itemId)
        : [...prevState, itemId],
    );
  };

  const getFileName = (path: string) => {
    const lastDotIndex = path.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      return path.substring(0, lastDotIndex);
    }
    return path;
  };

  const renderTreeItem = (item: WorkspaceType) => {
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id}>
        {item.type === "folder" ? (
          <FolderButton
            name={item.name}
            path={item.path}
            onClick={() => toggleItem(item.id)}
            expanded={isExpanded}
          />
        ) : (
          getFileName(item.name) !== homeName && (
            <FileButton name={item.name} path={item.path} />
          )
        )}
        {item.type === "folder" && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={{
                  expanded: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.1 }}
                style={{ overflow: "hidden", marginLeft: "20px" }}
              >
                {item.items && item.items.map(renderTreeItem)}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <Box
      pb={24}
      w="full"
      h="full"
      overflowY="hidden"
      _hover={{
        overflowY: "scroll",
      }}
    >
      {items.map(renderTreeItem)}
    </Box>
  );
};

export default TreeView;
