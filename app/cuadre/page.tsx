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
import UpdateCuadrebtn from "@/components/botons/cuadre/UpdateCuadrebtn";
import DeleteCuadrebtn from "@/components/botons/cuadre/DeleteCuadrebtn";
import AddCuadrebtn from "@/components/botons/cuadre/AddCuadrebtn";
import SumaTotalButton from "@/components/botons/cuadre/CalcularTotal";
import LimpiarCuadrebtn from "@/components/botons/cuadre/LimpiarCuadre";

export const runtime = 'edge';


export default async function Cuadre() {
  const serverSupabase = createServerComponentClient({ cookies });
  const { data: user } = await serverSupabase.auth.getUser();
  const { data: reservas } = await serverSupabase
    .from("producto")
    .select("id ,created_at, cant, precio, total, name")


  return (
    <div>
      <Navbar />
      <Toast />
      <div className="container mt-5">
        <div className="flex gap-2">
        <SumaTotalButton />
        <LimpiarCuadrebtn />
        </div>
        <AddCuadrebtn />
        {reservas && reservas.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Total Vendido</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((item) => {
                return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.cant}</TableCell>
                  <TableCell>{item.precio}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <DeleteCuadrebtn id={item.id} />
                      <UpdateCuadrebtn id={item.id} />
                    </div>
                  </TableCell>
                </TableRow>
                );
            }
            )}
            </TableBody>
          </Table>
        )}

        {reservas && reservas.length < 1 && (
          <h1 className="text-center font-bold text-xl">
            No tienes productos...
          </h1>
        )}
      </div>
    </div>
  );
}
