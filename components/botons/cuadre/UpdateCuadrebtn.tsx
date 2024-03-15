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

export default function UpdateCuadrebtn({ id }: { id: number }) {
 const router = useRouter();
 const supabaseClient = createClientComponentClient();
 const [open, setOpen] = useState(false); // Controls the visibility of the dialog
 const [newName, setNewName] = useState(''); // State for the new name
 const [newCant_ini, setNewCant_ini] = useState('');
 const [newCant_fin, setNewCant_fin] = useState('');
 const [newPrecio, setNewPrecio] = useState('');


 const updateHome = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("producto")
        .update({ 
          name: newName,
          cant_ini: newCant_ini,
          cant_fin: newCant_fin,
          precio: newPrecio,
        }) // Updates the fields with the new values
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
          <AlertDialogTitle>Editar Producto</AlertDialogTitle>
          {/* <AlertDialogDescription>
            Ingrese los nuevos valores para el hotel.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <Input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Editar Producto"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="number"
          value={newCant_ini}
          onChange={(e) => setNewCant_ini(e.target.value)}
          placeholder="Editar CI"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="number"
          value={newCant_fin}
          onChange={(e) => setNewCant_fin(e.target.value)}
          placeholder="Editar CF"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="number"
          value={newPrecio}
          onChange={(e) => setNewPrecio(e.target.value)}
          placeholder="Editar Precio"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={updateHome}>Editar</AlertDialogAction>
        </AlertDialogFooter>
        {/* Inputs for the new values */}
      </AlertDialogContent>
    </AlertDialog>
 );
}
