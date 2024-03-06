"use client";
import React from "react";
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
import { Edit2Icon, Trash } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Env from "@/config/Env";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
export default function UpdateHomebtn({ id, onEdit }: { id: number, onEdit: (id: number) => void }) {
    const router = useRouter();
    const supabaseClient = createClientComponentClient();
   
    const editHome = () => {
       onEdit(id);
    };
   
    return (
       <AlertDialog>
         <AlertDialogTrigger asChild>
           <Button size="icon" variant="destructive" className="bg-blue-400" onClick={editHome}>
             <Edit2Icon />
           </Button>
         </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
          Esta acción no se puede deshacer. Esto eliminará permanentemente tu
            añadido a casa y eliminar sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={editHome}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
