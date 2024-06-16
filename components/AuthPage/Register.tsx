"use client";

import React, {useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { doCreateUserWithEmailAndPassword, sendVerificationEmail} from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storeUserData } from "@/lib/firebase/firestore";
import '../../app/globals.css';




type FormInputs = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const Register = () => {
  const [role, setRole] = useState('customer');
  const router = useRouter();

  const register = async () => {
    try {
      const user = await doCreateUserWithEmailAndPassword(
        data.current.email, 
        data.current.password );
      
      if(user){
        await storeUserData(user.uid, data.current.name, data.current.email, data.current.role)
        if (user) {
          // Send verification email
          await sendVerificationEmail();
          router.push("/auth/signIn");
        }
        
      }
    } catch (error:any) {
      
      console.log(error);
      alert("An error occurred during registration");
    }
    

  };

  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
    role: 'customer',
  });

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    data.current.role = selectedRole;
  };

  return (
    <>
      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="max-w-md w-full text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
            </div>
          </div>
          <form className="space-y-2" >
            <div>
              <label className="text-sm text-gray-600 font-bold"> Name </label>
              <Input
                type="text"
                autoComplete='off'
                required
                onChange={(e) => (data.current.name = e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-bold">Email</label>
              <Input
                name="email"
                autoComplete="off"
                required
                onChange={(e) => (data.current.email = e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-bold">Password</label>
              <Input
                type="password"
                name="password"
                autoComplete="off"
                required
                onChange={(e) => (data.current.password = e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-bold">Role</label>
              <select
                value={role}
                onChange={handleRoleChange}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
              >
                <option value="customer">customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button variant={"custom"}
              type="submit"
              onClick={(e) => {
                e.preventDefault(); // Add this line to prevent default form submission
                register();
              }}
              >
              Submit
            </Button>
            <div className="text-sm text-center">
              Already have an account? {'   '}
              <Link 
                href={"signIn"} 
                className="text-center text-blue-600 text-sm hover:underline font-bold"
              >
                Continue
              </Link>
            </div>

          </form>
        </div>
      </main>
    </>
  )
}

export default Register;
