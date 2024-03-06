"use client";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function SignOutBtn() {
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out!",
      description: "Logged out successfully!",
      className: "bg-green-400",
    });
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
          Salir
        </li>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
          Esto eliminará su sesión de autenticación y tendrá que iniciar sesión nuevamente para
            acceder a rutas privadas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
