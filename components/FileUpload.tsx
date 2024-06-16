// components/FileUpload.tsx
import { ChangeEvent } from 'react';
import { storage } from '@/lib/firebase/firebase';
import 'tailwindcss/tailwind.css';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FileUploadProps {
  onUpload: (url: string) => void;
}

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const storageRef = storage.ref(`seatPlans/${file.name}`);
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();
      onUpload(url);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button>Upload Seat Plan</Button>
    </div>
  );
};
