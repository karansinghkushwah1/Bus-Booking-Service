'use client'

import { FormEvent, useState } from "react";
import { passwordReset } from "@/lib/firebase/auth";
import Link from "next/link";

function forgotPassword() {
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await passwordReset(email);
      setEmailMessage(true);
    } catch (error:any) {    
      if (error.code === 'auth/user-not-found') {
        alert('User not found, try again!');
        setEmail('');
      }
    }
  };
  
  return (
    <div className="w-full h-screen flex self-center place-content-center place-items-center">
      <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
        <h3 className="text-center text-gray-800 text-xl font-semibold sm:text-2xl">Forgot password</h3>
        {emailMessage ? (
           <>
            <h3 className="text-green-500">The Email has been sent; Check your Inbox!</h3>
            <p className="text-center text-sm">
              <Link href={"/signIn"} className="hover:underline font-bold">
                Go to Login page
              </Link>
            </p>
           </>
        ) : (
            
          <form onSubmit={handleSubmit} className="space-y-5">
            <input 
              type="email" 
              name="email"
              placeholder="name@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type='submit' className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              Reset Your Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default forgotPassword;
