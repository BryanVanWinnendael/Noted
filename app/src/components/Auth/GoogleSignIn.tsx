import { auth } from "lib/firebase";
import { useCallback, useEffect } from "react";
import { MyWindow } from "types/index";
import { GoogleAuthProvider, inMemoryPersistence, signInWithCredential } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

declare let window: MyWindow;

const invoke = window.electron.invoke;
const win = window.electron.ipcRenderer

const GoogleSignIn = ({ onClose }:{ onClose: () => void }) => {
  const signInWithGoogle = async () => {
    const link = import.meta.env.VITE_CLIENT_URL + "app/signin";
    invoke("openBrowser", link);
  };

  const signInWithToken = useCallback(async (token: string) => {
    auth.setPersistence(inMemoryPersistence)
    const credential = GoogleAuthProvider.credential(token);
    signInWithCredential(auth, credential)
    .then(() => {
      onClose()
    })
    .catch((error) => {
      console.error("Error signing in with token:", error);
    });
  },[onClose])

  useEffect(() => {
    win.on("token", (token: string) => {
      signInWithToken(token);
    });
  },[signInWithToken])

  return (
    <Button onClick={signInWithGoogle} display="flex" alignItems="center" gap={2}>
      <FcGoogle />
      Sign in with google
    </Button>
  )
}

export default GoogleSignIn