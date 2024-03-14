"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { countries } from "@/config/countries";
import { Input } from "../../ui/input";

import { categories } from "@/config/categories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Env from "@/config/Env";
import { generateRandomNumber } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HomeSchemaType, homeSchema } from "@/validation/homeSchema";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
import { Textarea } from "@/components/ui/textarea";

export const runtime = 'edge';


export default function AddHomeForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [homeCategories, setHomeCategories] = useState<Array<string> | []>([]);
  const [description, setDescription] = useState("");
  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<HomeSchemaType>({
    resolver: yupResolver(homeSchema),
  });

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
       setImage(file);
       setValue("image", file);
    } else {
       console.error("No se seleccionó ningún archivo");
    }
   };
   
  useEffect(() => {
    setValue("categories", homeCategories);
    setValue("description", description);
  }, [homeCategories, description]);

  const submit = async (payload: HomeSchemaType) => {
    setLoading(true);
    const user = await supabase.auth.getUser();
    const uniquePath = Date.now() + "_" + generateRandomNumber();
    const { data: imgData, error: imgErr } = await supabase.storage
    .from(Env.S3_BUCKET)
    .upload(uniquePath, image!);
   if (imgErr) {
    console.error("Error al subir la imagen:", imgErr);
    toast.error(imgErr.message, { theme: "colored" });
    setLoading(false);
    return;
   }
   

    // * Store home
    const { error: homeErr } = await supabase.from("homes").insert({
      user_id: user.data.user?.id,
      country: payload.country,
      state: payload.state,
      city: payload.city,
      title: payload.title,
      price: payload.price,
      description: payload.description,
      categories: homeCategories,
      image: imgData?.path,
    });

    if (homeErr) {
      toast.error(homeErr.message, { theme: "colored" });
      setLoading(false);
      return;
    }

    router.push("/dashboard?success=Hotel agregado correctamente!");
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="mb-5">
      <ToastContainer />
      <div className="grid grid-cols-1  lg:grid-cols-2  gap-4">
        <div className="mt-5">
          <Label htmlFor="title">Nombre</Label>
          <Input
            placeholder="Escribir Nombre"
            id="title"
            onChange={(e) => setValue("title", e.target.value)}
          />
          <span className="text-red-500 font-bold">
            {errors?.title?.message}
          </span>
        </div>
        <div className="mt-5">
          <Label htmlFor="countries">País</Label>
          <select
            className="outline-brand h-10 px-3 py-2 rounded-md w-full border"
            id="countries"
            {...register("country")}
          >
            <option value=""> -- Seleccionar País --</option>
            {countries.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="text-red-500 font-bold">
            {errors?.country?.message}
          </span>
        </div>
        <div className="mt-5">
          <Label htmlFor="state">Estado</Label>
          <Input placeholder="Escribir Estado" id="state" {...register("state")} />
          <span className="text-red-500 font-bold">
            {errors?.state?.message}
          </span>
        </div>
        <div className="mt-5">
          <Label htmlFor="city">Ciudad</Label>
          <Input placeholder="Escribir Ciudad" id="city" {...register("city")} />
          <span className="text-red-500 font-bold">
            {errors?.city?.message}
          </span>
        </div>
        <div className="mt-5">
          <Label htmlFor="price">Precio</Label>
          <Input
            placeholder="Insertar Precio"
            type="number"
            id="price"
            {...register("price")}
          />
          <span className="text-red-500 font-bold">
            {errors?.price?.message}
          </span>
        </div>
        <div className="mt-5">
          <Label htmlFor="image">Imagen</Label>
          <Input
            type="file"
            placeholder="Insertar Imagen"
            id="image"
            onChange={handleImage}
          />
          <span className="text-red-500 font-bold">
            {errors?.image?.message}
          </span>
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          placeholder="Escribe una descripción del hotel aquí... "
          id="description"
          {...register("description")}
        ></Textarea>
        {/* <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription} 
        /> */}
        <span className="text-red-500 font-bold">
          {errors?.description?.message}
        </span>
      </div>
      <div className="mt-5">
        <Label htmlFor="categories">Categorías o Servicios</Label>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((item) => (
            <div className="items-top flex space-x-2" key={item.name}>
              <input
                type="checkbox"
                checked={(homeCategories as string[]).includes(item.name)}
                id={item.name}
                value={item.name}
                className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                onChange={(event) => {
                  if (event.target.checked) {
                    setHomeCategories([...homeCategories, item.name]);
                  } else {
                    const filterCategories = homeCategories.filter(
                      (item) => item !== event.target.value
                    );
                    setHomeCategories(filterCategories);
                  }
                }}
              />
              <label htmlFor={item.name} className="text-sm font-medium ">
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <span className="text-red-500 font-bold mt-2">
          {errors?.categories?.message}
        </span>
      </div>
      <div className="mt-5">
        <Button className="bg-brand w-full" disabled={loading}>
          {loading ? "Cargando..." : "Agregar"}
        </Button>
      </div>
    </form>
  );
}
