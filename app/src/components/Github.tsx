import {
  Flex,
  Box,
  Text,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import { useState } from "react";

const Github = () => {
  const { accentColor, textColor, backgroundColor } = useColors();
  const { repo, changeRepo, pushRepo, setRepo } = useSettingsStore();
  const { mutedTextColor } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = () => {
    changeRepo(repo);
  };

  const handlePush = async () => {
    setLoading(true);
    const success = await pushRepo();
    setLoading(false);

    if (success) {
      toast({
        title: "Pushed to github",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to push to github",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={5} bg={backgroundColor}>
          <Flex p={2} px={5} w="full" gap={1} alignItems="center">
            <Text fontWeight={700} color={textColor}>
              {repo ? "Change" : "Add"} Github repo
            </Text>
          </Flex>
          <ModalBody px={4}>
            <Flex direction="column" gap={2}>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRepo(e.target.value)
                }
                value={repo}
                type="text"
              />
              <Button
                color={textColor}
                _hover={{
                  backgroundColor: accentColor,
                  opacity: 0.8,
                }}
                h={8}
                bg={accentColor}
                onClick={handleChange}
              >
                Save
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
        <Box>
          <Text fontWeight="semibold">Github repo</Text>
          <Text color={mutedTextColor}>
            Add a github repo to your workspace
          </Text>
        </Box>

        <Button
          color={textColor}
          _hover={{
            backgroundColor: accentColor,
            opacity: 0.8,
          }}
          h={8}
          bg={accentColor}
          onClick={onOpen}
        >
          {repo ? "Change" : "Add"}
        </Button>
      </Flex>
      {repo && (
        <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
          <Box>
            <Text fontWeight="semibold">Push</Text>
            <Text color={mutedTextColor}>
              Push your notes to the github repo
            </Text>
          </Box>
          <Button
            color={textColor}
            _hover={{
              backgroundColor: accentColor,
              opacity: 0.8,
            }}
            h={8}
            bg={accentColor}
            onClick={handlePush}
            isLoading={loading}
          >
            Push
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Github;
