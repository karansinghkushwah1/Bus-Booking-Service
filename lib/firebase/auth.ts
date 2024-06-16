import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  confirmPasswordReset,
} from "firebase/auth";



export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // You can add logic here to store user data in your preferred storage

    return user;
  } catch (error) {
    // Handle the error, e.g., display an error message to the user
    console.error("Error creating user:", error);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  
};

export const doSignOut = () => {
  return auth.signOut();
};


// Function to send verification email
export const sendVerificationEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser!);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const passwordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email)
}

export const confirmThePasswordReset = async (
  oobCode:string, newPassword:string
) => {
  if(!oobCode && !newPassword) return;
  
  return await confirmPasswordReset(auth, oobCode, newPassword)
}

