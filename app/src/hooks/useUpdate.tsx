import { WarningIcon } from "@chakra-ui/icons";
import { Flex, useToast, Text } from "@chakra-ui/react";
import UpdateToast from "components/UpdateToast";
import { useSettings } from "contexts/SettingsContext";
import { useState } from "react";
import { TOAST_ID } from "utils/constants";
import useColors from "./useColors";

const useUpdate = () => {
  const { secondaryBackgroundColorLighter, textColor, borderColor, iconColor } =
    useColors();
  const toast = useToast();
  const { checkUpdate } = useSettings();
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(false);

  const handleCheckUpdate = async () => {
    setLoadingUpdates(true);
    const update = await checkUpdate();
    if (update) {
      if (toast.isActive(TOAST_ID)) return setLoadingUpdates(false);
      toast({
        id: TOAST_ID,
        duration: null,
        isClosable: true,
        render: () => <UpdateToast version={update} />,
      });
    } else {
      if (toast.isActive(TOAST_ID)) return setLoadingUpdates(false);
      toast({
        id: TOAST_ID,
        title: "No updates available",
        status: "info",
        duration: 3000,
        isClosable: true,
        render: () => (
          <Flex
            border="1px"
            borderColor={borderColor}
            alignItems="center"
            bg={secondaryBackgroundColorLighter}
            color={textColor}
            p={3}
            rounded="md"
          >
            <WarningIcon color={iconColor} mr={3} />
            <Text>No updates available</Text>
          </Flex>
        ),
      });
    }
    setLoadingUpdates(false);
  };

  return {
    loadingUpdates,
    handleCheckUpdate,
  };
};

export default useUpdate;
