"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import '../../app/globals.css';
import { doSignInWithEmailAndPassword } from "@/lib/firebase/auth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { global } from "styled-jsx/css";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const router = useRouter();
  const userName = useRef("");
  const [error, setError] = useState<string | null>(null);
  const pass = useRef("");
  const recaptchaRef = useRef<any>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await doSignInWithEmailAndPassword(
        userName.current,
        pass.current
      );
      if(userCredential.user){
        if (userCredential.user.emailVerified) {
          router.push('/bus');
        } else {
          // Handle authentication failure
          setError("First verify your email");
        }
      }
      else{
        // Handle authentication failure
        setError("Authentication failed");
        
      }
      
    } catch (error) {
      console.error('Firebase authentication error:', error);
      setError("Invalid Credentials");
    }
  };      
  return (
    <div>
      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center">
            <div className="mt-2">
              <h2 className="text-gray-900 text-xl font-semibold sm:text-2xl">Sign in</h2>
              {/* <h4 className="text-gray-500 text-xl sm:text-1xl">Start your Learning Journey</h4> */}
              {!!error && (
                <p className="bg-red-100 text-red-600 text-center p-2">
                  {error}
                </p>
              )}

            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="space-y-5"
          >
            <div>
              <label className="text-sm text-gray-600 font-bold">
              Your email
              </label>
              <Input
                type="email"
                autoComplete='email'
                required
                onChange={(e) => (userName.current = e.target.value)}

              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-bold">
                Password
              </label>
              <Input
                type="password"
                autoComplete='current-password'
                required
                onChange={(e) => (pass.current = e.target.value)}
              />
            </div>
            <Button
              variant={"custom"}
              type="submit"
            >
              Sign in
            </Button>

          </form>
          <p className="text-right">
              <Link href={"/auth/forgotPassword"} className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">
                Forgot password?
              </Link>
          </p>
          <p className="text-center text-sm">Don't have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;

