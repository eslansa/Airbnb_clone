import Navbar from "@/components/base/Navbar";
import React from "react";

import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

export default async function ShowHome({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("homes")
    .select("* ,users (metadata->name)")
    .eq("id", params?.id);
  const home: HomesType | null = data?.[0];
  return (
    <div className="mb-10">
      <Navbar />
      <div className="container mt-5 justify-center text-center">
        {/* Title and Country details */}
        <div>
          <h1 className="text-2xl font-bold">{home?.title}</h1>
          <p>
            {home?.city} , {home?.state} ,{home?.country}
          </p>
        </div>
        <div className="flex justify-center items-center">
        <Image
          src={getImageUrl(home?.image)}
          width={100}
          height={100}
          alt="home_img"
          className="w-1/2 rounded-lg h-[500px] object-cover object-center my-5"
          unoptimized
        />
        </div>
        <h1 className="text-2xl font-bold text-brand">
          Precio: <span className=" text-zinc-900 font-mono">${home?.price}</span> 
        </h1>

        {/* <h1 className="text-xl font-semibold">
          {home?.title} in {home?.city} , {home?.state} ,{home?.country}
        </h1> */}
        <span className="mt-2 font-bold font-mono text-2xl">Descripcion:</span>
        <div
          className="mt-2 italic"
          dangerouslySetInnerHTML={{
            __html: home?.description,
          }}
        ></div>
          <Button className="bg-brand hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
          Reservar
        </Button>
      </div>
    </div>
  );
}
