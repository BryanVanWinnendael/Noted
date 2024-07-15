import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "lib/firebase";
import useColors from "hooks/useColors";
import { MyWindow } from "types/index";

declare let window: MyWindow;

const invoke = window.electron.invoke;

const FormSignIn = ({ onClose }: { onClose: () => void }) => {
  const { accentColor, textColor } = useColors();
  const [isError, setIsError] = useState(false);
  const [input, setInput] = useState({
    email: "fcmecraft2@gmail.com",
    password: "",
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setInput({
      ...input,
      email: e.target.value,
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setInput({
      ...input,
      password: e.target.value,
    });
  };

  const handleSignIn = async () => {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, input.email, input.password)
      .then(async () => {
        onClose();
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const handleCreateAccount = () => {
    const link = import.meta.env.VITE_CLIENT_URL + "signup";
    invoke("openBrowser", link);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
    >
      <FormControl isInvalid={isError}>
        {isError && <FormErrorMessage>Invalid credentials</FormErrorMessage>}
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={input.email} onChange={handleChangeEmail} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={input.password}
          onChange={handleChangePassword}
        />
      </FormControl>
      <Text onClick={handleCreateAccount} cursor="pointer" color={accentColor}>
        create an account
      </Text>
      <Button
        w="100%"
        mt={4}
        bg={accentColor}
        _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
        color={textColor}
        type="submit"
      >
        Sign in with email
      </Button>
    </form>
  );
};

export default FormSignIn;
