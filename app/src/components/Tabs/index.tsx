import { AddIcon } from "@chakra-ui/icons";
import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { AnimatePresence, motion } from "framer-motion";
import useColors from "hooks/useColors";

const Index = () => {
  const {
    accentColor,
    mutedTextColor,
    textColor,
    secondaryBackgroundColorLighter,
    getTransparent,
  } = useColors();
  const { activeTab, tabs, addTab, handleChangeTab, removeTab, platform } =
    useWorkspaceStore();
  const workspace_path = localStorage.getItem("workspace_path");
  const homeName =
    platform === "win32"
      ? workspace_path?.split("\\").pop() + ".home"
      : workspace_path?.split("/").pop() + ".home";

  const getFileName = (path: string) => {
    const extension = path.split(".")[path.split(".").length - 1];
    let full_name;

    if (platform === "win32") {
      full_name = path.split("\\");
    } else {
      full_name = path.split("/");
    }

    const name = full_name[full_name.length - 1].split("." + extension)[0];

    if (name === homeName) return "Home";
    return name;
  };

  const handleRemoveTab = (index: number) => {
    removeTab(index);
  };

  return (
    <Flex w="full" alignItems="center">
      <AnimatePresence mode="popLayout">
        {tabs &&
          Object.keys(tabs).map((key, index) => (
            <motion.div
              className="tab-motion"
              layout
              animate={{ scale: 1 }}
              key={index}
            >
              <Tooltip
                placement="bottom"
                label={getFileName(tabs[parseInt(key)].path)}
                bg={secondaryBackgroundColorLighter}
                color={textColor}
                rounded="md"
              >
                <Flex
                  cursor="pointer"
                  justifyContent="space-between"
                  minW={0}
                  overflow="hidden"
                  w={index === activeTab ? "15rem" : "10rem"}
                  ml={2}
                  px={2}
                  borderRadius={4}
                  h={7}
                  opacity={10}
                  bg={
                    index === activeTab
                      ? getTransparent(100, secondaryBackgroundColorLighter)
                      : getTransparent(0.5, secondaryBackgroundColorLighter)
                  }
                  color={index === activeTab ? accentColor : mutedTextColor}
                >
                  <Flex
                    onClick={() => handleChangeTab(index)}
                    w="90%"
                    alignItems="center"
                  >
                    <Text
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {getFileName(tabs[parseInt(key)].path)}
                    </Text>
                  </Flex>
                  {activeTab === index && Object.keys(tabs).length > 1 && (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      onClick={() => handleRemoveTab(index)}
                      fill={accentColor}
                      _hover={{ fill: accentColor }}
                      cursor="pointer"
                      w="fit-content"
                      h="full"
                    >
                      <svg
                        width="1rem"
                        height="1rem"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                        enable-background="new 0 0 52 52"
                      >
                        <path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z" />
                      </svg>
                    </Flex>
                  )}
                </Flex>
              </Tooltip>
            </motion.div>
          ))}
      </AnimatePresence>
      {Object.keys(tabs).length > 0 && (
        <Tooltip
          placement="bottom"
          label={"Ctrl+T"}
          bg={secondaryBackgroundColorLighter}
          color={textColor}
          rounded="md"
        >
          <AddIcon
            ml={2}
            onClick={addTab}
            cursor="pointer"
            color={mutedTextColor}
            _hover={{ color: accentColor }}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

export default Index;
