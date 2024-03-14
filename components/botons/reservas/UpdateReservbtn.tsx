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

export default function UpdateReservabtn({ id }: { id: number }) {
 const router = useRouter();
 const supabaseClient = createClientComponentClient();
 const [open, setOpen] = useState(false); // Controls the visibility of the dialog
 const [newName, setNewName] = useState(''); // State for the new name
 const [newApellidos, setNewApellidos] = useState('');
 const [newTelef, setNewTelef] = useState('');
 const [newDate_ini, setNewDate_ini] = useState('');
 const [newDate_fin, setNewDate_fin] = useState('');
 const [newPay, setNewPay] = useState('');
 const [newNum_person, setNewNum_person] = useState('');

 const updateHome = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("reservas")
        .update({ 
          name: newName,
          apellidos: newApellidos,
          telef: newTelef,
          date_ini: newDate_ini,
          date_fin: newDate_fin,
          pay: newPay,
          num_person: newNum_person,
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
          <AlertDialogTitle>Editar Hoteles</AlertDialogTitle>
          <AlertDialogDescription>
            Ingrese los nuevos valores para el hotel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nuevo Nombre"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="text"
          value={newApellidos}
          onChange={(e) => setNewApellidos(e.target.value)}
          placeholder="Nuevos Apellidos"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="text"
          value={newTelef}
          onChange={(e) => setNewTelef(e.target.value)}
          placeholder="Nuevo Telefono"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="text"
          value={newDate_ini}
          onChange={(e) => setNewDate_ini(e.target.value)}
          placeholder="Nueva Fecha Inicio"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="text"
          value={newDate_fin}
          onChange={(e) => setNewDate_fin(e.target.value)}
          placeholder="Nueva Fecha Fin"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="text"
          value={newPay}
          onChange={(e) => setNewPay(e.target.value)}
          placeholder="Nuevo Pago"
          className="border-2 border-gray-300 p-2 rounded-md mt-4"
        />
        <Input
          type="number"
          value={newNum_person}
          onChange={(e) => setNewNum_person(e.target.value)}
          placeholder="Nueva Cantidad de Personas"
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
