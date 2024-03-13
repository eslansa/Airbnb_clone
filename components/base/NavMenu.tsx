"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MenuIcon } from "lucide-react";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";
import SignOutBtn from "../auth/SignOutBtn";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function NavMenu({ session }: { session: object | null }) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <MenuIcon className="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="mr-6 ">
          <ul>
            {session ? (
              <>
                 <Link href="/" className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                  Inicio
                </Link>
                <Link href="/dashboard">
                  <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                    Hoteles
                  </li>
                </Link>
             
                <Link href="/res-home" className="hover:bg-gray-200 rounded-md cursor-pointer">
                  <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                    Reservas 
                  </li>
                </Link>
                <Link href="/#" className="hover:bg-gray-200 rounded-md cursor-pointer">
                  <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                    Usuarios 
                  </li>
                </Link>
                <Link href="/#" className="hover:bg-gray-200 rounded-md cursor-pointer">
                  <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                    Servicios 
                  </li>
                </Link>

                <SignOutBtn />
              </>
            ) : (
              <>
                <LoginModal />
                <SignupModal />
              </>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
}
