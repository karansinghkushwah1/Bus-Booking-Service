"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Logo from "@/public/homePage/logoDesign.png";
import Image from "next/image";
import { useAuth } from "@/lib/context/autoContext";
import { auth } from "@/lib/firebase/firebase";

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const { userLoggedIn, currentUser } = useAuth(); // Using context to get user data and logout function

  const menus = [
    { title: "Home", path: "/" },
    { title: "Book Now", path: "/auth/signIn" },
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <nav className="bg-white w-full border-b md:border-0">
      <div className="items-center px-8 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <Image
              src={Logo}
              alt="Padharo Hamare Desh Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:flex md:items-center md:justify-between md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col justify-center items-center space-y-8 md:flex-row md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-gray-600 hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {userLoggedIn && currentUser ? (
              <>
                <span className="text-gray-600">
                  Hello, {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signIn">
                  <button className="bg-blue-500 text-white p-2 rounded">
                    Login
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="bg-green-500 text-white p-2 rounded">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
