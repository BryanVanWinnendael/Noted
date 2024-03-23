import React, { useState } from 'react';
import { WorkspaceType } from 'types'; // Assuming your types are in a file named 'types.ts'
import FileButton from './FileButton'; // Assuming the FileButton component is in a file named 'FileButton.tsx'
import FolderButton from './FolderButton'; // Assuming the FolderButton component is in a file named 'FolderButton.tsx'
import { Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeViewProps {
  items: WorkspaceType[];
}

const TreeView: React.FC<TreeViewProps> = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setExpandedItems(prevState =>
      prevState.includes(itemId)
        ? prevState.filter(id => id !== itemId)
        : [...prevState, itemId]
    );
  };

  const renderTreeItem = (item: WorkspaceType) => {
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id}>
        {item.type === 'folder' ? (
          <FolderButton
            name={item.name}
            path={item.path}
            onClick={() => toggleItem(item.id)}
            expanded={isExpanded}
          />
        ) : (
          <FileButton name={item.name} path={item.path} />
        )}
        {item.type === 'folder' && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={{
                  expanded: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.1 }}
                style={{ overflow: 'hidden', marginLeft: '20px' }}
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
      w="full"
      h="full"
      pb={24}
      overflowY="hidden"
      _hover={{
        overflowY: 'scroll',
      }}
    >
      {items.map(renderTreeItem)}
    </Box>
  );
};

export default TreeView;
