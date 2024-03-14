import Navbar from "@/components/base/Navbar";
import Toast from "@/components/base/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import DeleteHomebtn from "@/components/botons/hotels/DeleteHomebtn";
import Link from "next/link";
import { EditIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpdateHomebtn from "@/components/botons/hotels/UpdateHomebtn";
import DeleteReservaBtn from "@/components/botons/reservas/DeleteReservaBtn";
import UpdateReservabtn from "@/components/botons/reservas/UpdateReservbtn";

export const runtime = 'edge';


export default async function ResHome() {
  const serverSupabase = createServerComponentClient({ cookies });
  const { data: user } = await serverSupabase.auth.getUser();
  const { data: reservas } = await serverSupabase
    .from("users")
    .select("id ,created_at ,email")



  return (
    <div>
      <Navbar />
      <Toast />
      <div className="container mt-5">
        {reservas && reservas.length > 0 && (
          <Table>
            <TableCaption>Reservas en Adrenalina & Turismo.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha de Creacion</TableHead>
                <TableHead>Correo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((item) => {
                return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  {/* <TableCell>
                    <div className="flex items-center space-x-2">
                      <DeleteReservaBtn id={item.id} />
                      <Link href={`/home/${item.id}`}>
                        <Button size="icon" className="bg-green-400">
                          <Eye />
                        </Button>
                      </Link>
                      <UpdateReservabtn id={item.id} />
                    </div>
                  </TableCell> */}
                </TableRow>
                );
            }
            )}
            </TableBody>
          </Table>
        )}

        {reservas && reservas.length < 1 && (
          <h1 className="text-center font-bold text-xl">
            Usuarios en Adrenalina y Turismo...
          </h1>
        )}
      </div>
    </div>
  );
}
