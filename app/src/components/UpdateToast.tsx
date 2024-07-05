import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { useSettings } from "contexts/SettingsContext";
import { utils } from "utils";
import { useState } from "react";

const UpdateToast = () => {
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(false);
  const { getSecondaryBackgroundColor, getAccentColor, getTextColor } =
    useColors();
  const { updateAndRestart } = useSettings();
  const toast = useToast();

  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_colorRight = utils.getLighterColor(
    "0.02",
    secondary_background_color,
  );
  const accent_color = getAccentColor();
  const text_color = getTextColor();

  const handleClsoe = () => {
    toast.closeAll();
  };

  const hanleUpdate = () => {
    setLoadingUpdates(true);
    updateAndRestart();
  };

  return (
    <Box color={text_color} bg={bg_colorRight} rounded="md" p={2}>
      {loadingUpdates ? (
        <Center>
          <Spinner bg={accent_color} />
        </Center>
      ) : (
        <>
          <Text fontSize="sm">A new update is avaible!</Text>
          <Text fontSize="sm">Do you want to restart now?</Text>
          <Flex mt={2} gap={2}>
            <Button
              bg={accent_color}
              _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
              color={utils.getTextColor(accent_color)}
              h={8}
              onClick={hanleUpdate}
            >
              Yes
            </Button>
            <Button
              h={8}
              color={text_color}
              _hover={{ opacity: 0.6 }}
              borderColor={accent_color}
              variant="outline"
              onClick={handleClsoe}
            >
              No
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default UpdateToast;
