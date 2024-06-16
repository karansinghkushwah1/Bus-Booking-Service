"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/context/autoContext';
import BrowseBuses from '@/components/BusPages/BrowseBuses';

const Home = () => {
  const router = useRouter();
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push('/auth/signIn');
    }
  }, [userLoggedIn, router]);

  return (
    <div className="container mx-auto p-4">
      <BrowseBuses />
    </div>
  );
};

export default Home;
