"use client";
import { categories } from "@/config/categories";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Categories() {
 const router = useRouter();
 const params = useSearchParams();
 const [selectedCats, setSelectedCats] = useState<string[]>([]);

 useEffect(() => {
    const categoryParam = params?.get("category");
    if (categoryParam) {
      setSelectedCats(categoryParam.split(','));
    }
 }, [params]);

 const handleClick = (cat: string) => {
    const newSelectedCats = selectedCats.includes(cat)
      ? selectedCats.filter(c => c !== cat)
      : [...selectedCats, cat];

    const fullUrl = new URL(window.location.href);
    fullUrl.searchParams.set("category", newSelectedCats.join(','));
    router.replace(`/${fullUrl.search}`);
 };

 return (
    <div className="flex items-center space-x-8 px-10 my-3 overflow-x-auto whitespace-nowrap scroll-smooth pb-4">
      {categories.map((item) => (
        <div
          className={`flex justify-center flex-col items-center cursor-pointer ${selectedCats.includes(item.name) ? "border-b-4 border-brand" : ""}`}
          key={item.name}
          onClick={() => handleClick(item.name)}
        >
          <Image src={item.icon} width={25} height={25} alt={item.name} />
          <span className="text-sm">
            {item.name}
          </span>
        </div>
      ))}
    </div>
 );
}
