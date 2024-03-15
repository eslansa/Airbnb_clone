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
    
        const cant_ini = Number(payload.cant_ini);
        const cant_fin = Number(payload.cant_fin);
        const precio = Number(payload.precio);
    
        const { error: homeErr, data } = await supabase.from("producto").insert({
            name: payload.name,
            cant_ini: cant_ini,
            cant_fin: cant_fin,
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
                    <Label htmlFor="name">Producto</Label>
                    <Input placeholder="Nombre del producto" id="name" {...register("name")} />
                    <span className="text-red-500 font-bold">
                        {errors?.name?.message}
                    </span>
                </div>
                <div className="mt-5 w-full">
                    <Label htmlFor="cant_ini">CI</Label>
                    <Input placeholder="Cantidad Inicial." id="cant_ini" {...register("cant_ini")} />
                    <span className="text-red-500 font-bold">
                        {errors?.cant_ini?.message}
                    </span>
                </div>
                <div className="mt-5 w-full">
                    <Label htmlFor="cant_fin">CF</Label>
                    <Input placeholder="Cantidad Final." id="cant_fin" {...register("cant_fin")} />
                    <span className="text-red-500 font-bold">
                        {errors?.cant_fin?.message}
                    </span>
                </div>
                <div className="mt-5 w-full">
                    <Label htmlFor="precio">Precio Producto</Label>
                    <Input placeholder="Precio del producto." id="precio" {...register("precio")} />
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
