import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if needed

// signup function
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // return user object if success
  } catch (error) {
    throw error; // let the caller handle errors
  }
};
