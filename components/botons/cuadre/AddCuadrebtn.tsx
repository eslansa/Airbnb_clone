"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../../ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { generateRandomNumber } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-quill/dist/quill.snow.css";
import { ResSchema, ResSchemaType } from "@/validation/resSchema";
import { DatePickerRes } from "@/components/common/DatePickerRes";
import { CuadreSchema } from "@/validation/cuadreSchema";

export const runtime = 'edge';

export default function AddCuadrebtn() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Importamos reset desde useForm
    } = useForm<CuadreSchema>({
        resolver: yupResolver(CuadreSchema),
    });

    const submit = async (payload: CuadreSchema) => {
        setLoading(true);
        const user = await supabase.auth.getUser();
    
        const cant = Number(payload.cant);
        const precio = Number(payload.precio);
    
        const { error: homeErr, data } = await supabase.from("producto").insert({
            name: payload.name,
            cant: cant,
            precio: precio,
        });
    
        if (homeErr) {
            toast.error(homeErr.message, { theme: "colored" });
            setLoading(false);
            return;
        }
    
        // Usamos reset para limpiar los campos del formulario
        reset();
    
        setLoading(false);
        router.refresh();
    };
    
    return (
        <form onSubmit={handleSubmit(submit)} className="mb-5 text-center justify-center items-center">
            <ToastContainer />
            <div className="flex flex-col items-center">
            <div className="mt-5 w-full">
                    <Label htmlFor="name">Nombre</Label>
                    <Input placeholder="Nombre del producto" id="name" {...register("name")} />
                    <span className="text-red-500 font-bold">
                        {errors?.name?.message}
                    </span>
                </div>
                <div className="mt-5 w-full">
                    <Label htmlFor="cant">Cantidad</Label>
                    <Input placeholder="Cantidad." id="cant" {...register("cant")} />
                    <span className="text-red-500 font-bold">
                        {errors?.cant?.message}
                    </span>
                </div>
                <div className="mt-5 w-full">
                    <Label htmlFor="precio">Precio</Label>
                    <Input placeholder="Precio." id="precio" {...register("precio")} />
                    <span className="text-red-500 font-bold">
                        {errors?.precio?.message}
                    </span>
                </div>      
            </div>
            <div className="mt-5">
                <Button className="bg-brand" disabled={loading}>
                    {loading ? "Cargando..." : "Agregar"}
                </Button>
            </div>
        </form>
    );
}
