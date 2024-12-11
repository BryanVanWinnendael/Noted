import {
  Flex,
  Box,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { useWorkspaceStore } from "stores/WorkspaceStore";

const ResetSettings = () => {
  const { accentColor, textColor, mutedTextColor, backgroundColor } =
    useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { resetWorkspaceSettings } = useWorkspaceStore();

  const handleReset = () => {
    resetWorkspaceSettings();
    onClose();
  };

  return (
    <Flex alignItems="center" justify="space-between">
      <Box>
        <Text fontWeight="semibold">Reset</Text>
        <Text color={mutedTextColor}>Reset all settings back to default</Text>
      </Box>

      <Button
        color={textColor}
        onClick={onOpen}
        _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
        h={8}
        bg={accentColor}
      >
        Reset
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={backgroundColor} w="full">
          <ModalHeader>Reset settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={textColor}>
              Are you sure you want to reset all settings back to default?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              _hover={{
                bg: "transparent",
                color: accentColor,
              }}
              color={textColor}
              bg="transparent"
              mr={3}
              onClick={onClose}
            >
              No
            </Button>
            <Button
              color={textColor}
              _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
              bg={accentColor}
              onClick={handleReset}
            >
              Yes reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ResetSettings;
