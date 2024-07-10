import { auth } from "@lib/firebase/client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AppSignIn = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider).then((result: any) => {
        if (window !== undefined) {
          window.location.href =
            "write-noted://" + result._tokenResponse.oauthIdToken;
        }
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  signInWithGoogle();

  return <div></div>;
};

export default AppSignIn;
