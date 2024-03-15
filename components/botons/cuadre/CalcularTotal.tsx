"use client"
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';


const SumaTotalButton = () => {
const supabase = createClientComponentClient();
 const [sumaTotal, setSumaTotal] = useState(null);

 const obtenerSumaTotal = async () => {
    try {
      const { data, error } = await supabase.rpc('actualizar_cuadre_total_y_guardar');
      if (error) throw error;
      // Ajusta esta línea para acceder directamente a data, ya que data es el resultado de la función RPC
      setSumaTotal(data);
    } catch (error) {
      console.error('Error al obtener el cuadre:', error);
    }
};

 return (
    <div>
      <Button onClick={obtenerSumaTotal}>Cuadre Total</Button>
      {sumaTotal && <p>El cuadre es: {sumaTotal}</p>}
    </div>
 );
};

export default SumaTotalButton;
