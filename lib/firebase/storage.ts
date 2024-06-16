import {ref, uploadBytesResumable, getDownloadURL , deleteObject, uploadBytes, getStorage} from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

  

export const uploadImageToStorage = async (image: File, title:string): Promise<string> => {
    try {
      // Create a reference to the image in Firebase Storage
      const imageRef = ref(storage, `courses/${title}`);
  
      // Upload image to Firebase Storage
      const uploadTask = uploadBytesResumable(imageRef, image);
  
      // Get the download URL
      const snapshot = await uploadTask;
      const imageURL = await getDownloadURL(snapshot.ref);
  
      return imageURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
}; 


export const deleteImageFromStorage = async (imageName: string): Promise<void> => {
    try {
        const imageRef = ref(storage, `courses/${imageName}`);
        await deleteObject(imageRef);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};