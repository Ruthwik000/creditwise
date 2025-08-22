import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";  // adjust path

// login with google
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // You get user info here
    const user = result.user;
    return user;
  } catch (error) {
    throw error;
  }
};
