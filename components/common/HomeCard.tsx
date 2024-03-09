import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

export default function HomeCard({ home }: { home: any }) {
  return (
    
      <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <Link href={`/home/${home.id}`}>
        <Image
          src={getImageUrl(home.image)}
          width={100}
          height={100}
          alt={home.title}
          className="w-full h-[300px] rounded-xl object-cover object-center mb-4"
          unoptimized
        />
        <p className="font-semibold text-lg mb-2">
          {home.city}, {home.country}
        </p>
        <p className="text-gray-600">{home.title}</p>
        <p className="text-gray-500 text-sm">{home.price}</p>
        </Link>
        <Link href="/user-res">
        <button className="bg-brand hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
          Reservar
        </button>
        </Link>
      </div>
      
   
  );
}

