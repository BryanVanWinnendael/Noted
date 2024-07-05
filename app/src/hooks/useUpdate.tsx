import { WarningIcon } from "@chakra-ui/icons";
import { Flex, useToast, Text } from "@chakra-ui/react";
import UpdateToast from "components/UpdateToast";
import { useSettings } from "contexts/SettingsContext";
import { useState } from "react";
import { TOAST_ID } from "utils/constants";
import useColors from "./useColors";
import { utils } from "utils/index";

const useUpdate = () => {
  const {
    getSecondaryBackgroundColor,
    getTextColor,
    getBorderColor,
    getIconColor,
  } = useColors();
  const toast = useToast();
  const { checkUpdate } = useSettings();
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(false);

  const text_color = getTextColor();

  const border_color = getBorderColor();

  const icon_color = getIconColor();

  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color = utils.getLighterColor("0.02", secondary_background_color);

  const handleCheckUpdate = async () => {
    setLoadingUpdates(true);
    const update = await checkUpdate();
    if (update) {
      if (toast.isActive(TOAST_ID)) return setLoadingUpdates(false);
      toast({
        id: TOAST_ID,
        duration: null,
        isClosable: true,
        render: () => <UpdateToast />,
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
            borderColor={border_color}
            alignItems="center"
            bg={bg_color}
            color={text_color}
            p={3}
            rounded="md"
          >
            <WarningIcon color={icon_color} mr={3} />
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
