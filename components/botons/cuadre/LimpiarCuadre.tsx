"use client"
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';


const LimpiarCuadrebtn = () => {
const supabase = createClientComponentClient();
 const [sumaTotal, setSumaTotal] = useState(null);
 const [mensaje, setMensaje] = useState('');
 
 const obtenerSumaTotal = async () => {
     try {
       const { data, error } = await supabase.rpc('limpiar_cuadre_total');
       if (error) throw error;
       setSumaTotal(data);
       setMensaje('Tu cuadre es 0.');
     } catch (error) {
       console.error('Error al obtener la suma total:', error);
       setMensaje('Error al ejecutar Limpiar Cuadre.');
     }
 };
 
 return (
     <div>
       <Button onClick={obtenerSumaTotal}>Limpiar Cuadre</Button>
       {mensaje && <p>{mensaje}</p>}
     </div>
 ); 
};

export default LimpiarCuadrebtn;
