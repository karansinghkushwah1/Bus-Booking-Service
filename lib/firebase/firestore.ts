import { firestore} from '@/lib/firebase/firebase';

import { doc, setDoc, getDocs, collection, addDoc ,query, where, getDoc, arrayUnion, updateDoc} from 'firebase/firestore';
import {uploadImageToStorage } from '@/lib/firebase/storage';
import {ref, uploadBytesResumable, getDownloadURL , uploadBytes} from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";


// Function to store user data in Firestore
export const storeUserData = async (userId: string, userName: string, userEmail: string, userRole: string) => {
    try {
      // Check if the email is already registered
      const querySnapshot = await getDoc(doc(firestore, "users", userId));
      if (querySnapshot.exists()) {
        throw new Error("Email is already registered");
      }
  
      // If email is not registered, store user data
      const userData = {
        name: userName,
        email: userEmail,
        role: userRole,
      };
      const userRef = doc(firestore, "users", userId);
      await setDoc(userRef, userData);
    } catch (error) {
      throw error;
    }
};

export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const userDoc = await firestore.collection("users").doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      return userData?.role || null; // Return user's role or null if role is not found
    } else {
      console.error("User document not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};