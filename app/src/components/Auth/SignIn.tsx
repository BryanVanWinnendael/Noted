import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useColors from "hooks/useColors";
import GoogleSignIn from "./GoogleSignIn";
import FormSignIn from "./FormSignIn";

const SignIn = () => {
  const { backgroundColor, textColor, accentColor } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    <Button bg={accentColor} _hover={{ backgroundColor: accentColor, opacity: 0.8 }} color={textColor} onClick={onOpen}>Sign in</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={5} bg={backgroundColor}>
          <Flex p={2} px={5} w="full" gap={1} alignItems="center">
            <Text
              bg={`linear-gradient(to right, ${accentColor}, ${textColor}, ${textColor})`}
              backgroundClip="text"
              backgroundSize="200% auto"
              fontWeight={700}
              fontSize="4xl"
            >
             Sign in
            </Text>
          </Flex>
          <ModalBody px={4}>
            <Flex direction="column" gap={2}>
              <FormSignIn onClose={onClose}/>
              <Text textAlign="center">or</Text>
              <GoogleSignIn onClose={onClose}/>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;
