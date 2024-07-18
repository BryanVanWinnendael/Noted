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
import { useState } from "react";

const UpdateToast = ({ version }: { version: string }) => {
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(false);
  const { accentColor, secondaryBackgroundColorLighter, textColor } =
    useColors();
  const { updateAndRestart } = useSettings();
  const toast = useToast();

  const handleClsoe = () => {
    toast.closeAll();
  };

  const hanleUpdate = () => {
    setLoadingUpdates(true);
    updateAndRestart();
  };

  return (
    <Box
      color={textColor}
      bg={secondaryBackgroundColorLighter}
      rounded="md"
      p={2}
    >
      {loadingUpdates ? (
        <Center>
          <Spinner color={accentColor} />
        </Center>
      ) : (
        <>
          <Text fontSize="sm">A new update is avaible! ({version})</Text>
          <Text fontSize="sm">Do you want to restart now?</Text>
          <Flex mt={2} gap={2}>
            <Button
              bg={accentColor}
              _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
              color={textColor}
              h={8}
              onClick={hanleUpdate}
            >
              Yes
            </Button>
            <Button
              h={8}
              color={textColor}
              _hover={{ opacity: 0.6 }}
              borderColor={accentColor}
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
