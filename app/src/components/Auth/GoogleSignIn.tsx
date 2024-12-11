import { auth } from "lib/firebase";
import { useCallback, useEffect } from "react";
import { MyWindow } from "types/index";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { Button, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

declare let window: MyWindow;

const invoke = window.electron.invoke;
const win = window.electron.ipcRenderer;

const GoogleSignIn = ({ onClose }: { onClose: () => void }) => {
  const toast = useToast();

  const signInWithGoogle = async () => {
    const link = import.meta.env.VITE_CLIENT_URL + "app/signin";
    invoke("openBrowser", link);
  };

  const signInWithToken = useCallback(
    async (token: string) => {
      const credential = GoogleAuthProvider.credential(token);
      signInWithCredential(auth, credential)
        .then(() => {
          onClose();
        })
        .catch(() => {
          toast({
            title: "Failed to sign in",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    },
    [onClose, toast],
  );

  useEffect(() => {
    win.on("token", (token: string) => {
      signInWithToken(token);
    });
  }, [signInWithToken]);

  return (
    <Button
      onClick={signInWithGoogle}
      display="flex"
      alignItems="center"
      gap={2}
    >
      <FcGoogle />
      Sign in with google
    </Button>
  );
};

export default GoogleSignIn;
