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

export const runtime = 'edge';

// Define el tipo de estado de fecha que espera tu DatePicker
type DateStateType = {
    startDate: Date;
    endDate: Date;
};

export default function AddResForm() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    // Inicializa dos estados separados para startDate y endDate
    const [dateRange, setDateRange] = useState<DateStateType>({
        startDate: new Date(),
        endDate: new Date(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ResSchemaType>({
        resolver: yupResolver(ResSchema),
    });

    const submit = async (payload: ResSchemaType) => {
        setLoading(true);
        const user = await supabase.auth.getUser();
    
        const startDate = dateRange.startDate;
        const endDate = dateRange.endDate;
    
        payload.date_ini = startDate;
        payload.date_fin = endDate;
    
        const { error: homeErr, data } = await supabase.from("reservas").insert({
            user_id: user.data.user?.id,
            date_ini: payload.date_ini,
            date_fin: payload.date_fin,
            pay: payload.pay,
            num_person: payload.num_person,
        });

        if (homeErr) {
            toast.error(homeErr.message, { theme: "colored" });
            setLoading(false);
            return;
        }

        router.push("/res-home?success=Home added successfully!");
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="mb-5 text-center justify-center items-center">
            <ToastContainer />
            <div className="flex flex-col items-center">
                <div className="mt-5 w-full">
                    <Label htmlFor="startDate" className="grid grid-flow-col  mb-1">Fecha Inicio</Label>
                    <DatePickerRes
                        date={dateRange.startDate}
                        setDate={(newDate) => {
                            setDateRange(prevState => ({ ...prevState, startDate: newDate ?? new Date() }));
                        }}
                    />
                </div>

                <div className="mt-5 w-full">
                    <Label htmlFor="endDate" className="grid grid-flow-col mb-1">Fecha Fin</Label>
                    <DatePickerRes
                        date={dateRange.endDate}
                        setDate={(newDate) => {
                            setDateRange(prevState => ({ ...prevState, endDate: newDate ?? new Date() }));
                        }}
                    />
                </div>

                <div className="mt-5 w-full">
                    <Label htmlFor="pay">Tipo de Pago</Label>
                    <Input placeholder="Efectivo,Tarjeta..." id="pay" {...register("pay")} />
                    <span className="text-red-500 font-bold">
                        {errors?.pay?.message}
                    </span>
                </div>
                
                <div className="mt-5 w-full">
                    <Label htmlFor="num_person">Numero Personas</Label>
                    <Input
                        placeholder="1-4"
                        type="number"
                        id="num_person"
                        {...register("num_person")}
                    />
                    <span className="text-red-500 font-bold">
                        {errors?.num_person?.message}
                    </span>
                </div>
            </div>
            <div className="mt-5">
                <Button className="bg-brand" disabled={loading}>
                    {loading ? "Processing..." : "Reservar"}
                </Button>
            </div>
        </form>
    );
}
