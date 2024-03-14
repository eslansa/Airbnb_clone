'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaRegStar } from "react-icons/fa";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default function HomeCard({ home }: { home: any }) {
  // const router = useRouter();
  const supabaseClient = createClientComponentClient(); // Aquí se crea el cliente de Supabase
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function fetchRating() {
      try {
        const { data, error } = await supabaseClient
          .from("homes")
          .select("valoracion")
          .eq("id", home.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setRating(data.valoracion);
        }
      } catch (error) {
        // Maneja el error según sea necesario
        // console.error("Error fetching rating:", error.message);
      }
    }

    fetchRating();
  }, [home.id]);

  const handleStarClick = (value: number) => {
    setRating(value);
    // Aquí puedes enviar la calificación actualizada al backend si es necesario
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            filled={value <= rating}
            onClick={() => handleStarClick(value)}
          />
        ))}
      </div>
      <Link href={`/home/${home.id}`}>
        <Image
          src={getImageUrl(home.image)}
          width={100}
          height={100}
          alt={home.title}
          className="w-full h-[300px] rounded-xl object-cover object-center mb-4"
          unoptimized
        />
      </Link>
      <p className="font-semibold text-lg mb-2">
        {home.city}, {home.country}
      </p>
      <p className="text-gray-600">{home.title}</p>
      <p className="text-gray-500 text-sm font-bold">$ {home.price}</p>
      <Link href={`/home/${home.id}`}>
        <Button>Reservar</Button>
      </Link>
    </div>
  );
}

function Star({ filled, onClick }: { filled: boolean; onClick: () => void }) {
  return (
    <FaRegStar
      className={`h-6 w-6 cursor-pointer ${filled ? "text-yellow-500" : "text-gray-300"}`}
      onClick={onClick}
    />
  );
}
