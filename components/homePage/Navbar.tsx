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
    <nav className="w-full border-b md:border-0">
      <div className="items-center max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <Image
              src={Logo}
              alt="Padharo Hamare Desh Logo"
              width={55}
              height={55}
              className="rounded-full mx-5"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="text-emerald-50 outline-none p-2 rounded-md focus:border-emerald-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:flex md:items-center md:justify-between md:pb-0 md:mt-0 ${state ? "block" : "hidden"
            }`}
        >
          <ul className="flex flex-col justify-center items-center space-y-8 md:flex-row md:space-x-8 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-emerald-100 hover:text-emerald-400">
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
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Sign-in
                    </span>
                  </button>


                </Link>
                <Link href="/auth/signup">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Sign-up
                    </span>
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
