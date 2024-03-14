"use client"
import React, { useState } from "react";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2Icon } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";

export const runtime = 'edge';

export default function UpdateHomebtn({ id }: { id: number }) {
 const router = useRouter();
 const supabaseClient = createClientComponentClient();
 const [open, setOpen] = useState(false); // Controls the visibility of the dialog
 const [newPrice, setNewPrice] = useState(''); // State for the new price
 const [newTitle, setNewTitle] = useState('');
 const [newCountry, setNewCountry] = useState('');
 const [newCity, setNewCity] = useState('');

 const updateHome = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("homes")
        .update({ 
          title : newTitle,
          price: newPrice,
          country: newCountry,
          city: newCity,
        }) // Updates the price with the new value
        .eq("id", id);

      if (error) {
        console.error('Error al actualizar:', error);
      } else {
        router.refresh(); // Refreshes the view or performs some action after the update
        setOpen(false); // Closes the dialog after the update
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
 };

 return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="secondary" onClick={() => setOpen(true)}>
          <Edit2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Hoteles</AlertDialogTitle>
          <AlertDialogDescription>
            Ingrese el nuevo precio para el hotel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nuevo Titulo"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
         <Input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Nueva Ciudad"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
         <Input
          type="text"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          placeholder="Nueva País"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Nuevo precio"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={updateHome}>Editar</AlertDialogAction>
        </AlertDialogFooter>
        {/* Input for the new price */}
      </AlertDialogContent>
    </AlertDialog>
 );
}
