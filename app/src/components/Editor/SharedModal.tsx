import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import ConfettiExplosion from "react-confetti-explosion";
import useColors from "hooks/useColors";
import { MyWindow } from "types/index";
import { useSettings } from "contexts/SettingsContext";

declare let window: MyWindow;

const invoke = window.electron.invoke;

const SharedModal = ({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}) => {
  const { backgroundColor, textColor, accentColor } = useColors();
  const { onOpen, setView } = useSettings();

  const handleVisit = () => {
    const link = import.meta.env.VITE_CLIENT_URL + "notes/" + id;
    invoke("openBrowser", link);
    onClose();
  };

  const handleViewAll = () => {
    setView("Notes");
    onOpen();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <ConfettiExplosion zIndex={99999999} particleCount={250} width={1600} />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={backgroundColor} color={textColor}>
          <ModalHeader>Note shared online!</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You can now visit your note online or view all your shared notes.
            </Text>
            <Flex>
              <Button
                _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
                bg={accentColor}
                color={textColor}
                mr={3}
                onClick={handleVisit}
              >
                visit
              </Button>
              <Button
                onClick={handleViewAll}
                _hover={{ opacity: 0.8 }}
                color={textColor}
                variant="outline"
              >
                view all shared notes
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SharedModal;
