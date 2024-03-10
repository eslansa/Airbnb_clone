
import Navbar from "@/components/base/Navbar";
import React from "react";
import AddResForm from "@/components/botons/reservas/AddReservaForm";



export default function AddRes() {
  // Assuming you have a home ID you want to link to
 const homeId = 'some-home-id';
  return (
    <div>
      <Navbar />
      <div className="container mt-10">
        <div className="container mt-5 ">
        
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:gap-2 gap-4">
            <AddResForm />
          </div>
        </div>
      </div>
    </div>
  );
}
