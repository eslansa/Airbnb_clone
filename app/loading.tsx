import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <Image src="/images/logo1.png" width={300} height={300} alt="logo" />
      <h1 className="mt-3 text-2xl">
        Espere cargando algunas de las mejores casas para usted...
      </h1>
    </div>
  );
}
