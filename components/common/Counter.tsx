"use client";
import React, { useEffect, useState, Suspense } from 'react';

// Declaración de tipo para AnimatedNumbers
let AnimatedNumbers: React.ComponentType<{
  includeComma?: boolean;
  animateToNumber: number;
  fontStyle?: object;
  locale?: string;
  configs?: Array<object>;
}> | undefined;

if (typeof window !== 'undefined') {
  // Esta línea solo se ejecutará en el lado del cliente después de la hidratación
  AnimatedNumbers = require('react-animated-numbers').default;
}

export default function Counter({ num }: { num: number }) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!AnimatedNumbers) {
    // Contenido de reserva mientras se espera la importación dinámica
    return null; // o algún otro contenido de marcador de posición
  }

  return (
    <>
      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatedNumbers
            includeComma
            animateToNumber={num}
            fontStyle={{ fontSize:  40, fontWeight: 'bold' }}
            locale='en-US'
            configs={[
              { mass:  1, tension:  220, friction:  100 },
              { mass:  1, tension:  180, friction:  130 },
              { mass:  1, tension:  280, friction:  90 },
              { mass:  1, tension:  180, friction:  135 },
              { mass:  1, tension:  260, friction:  100 },
              { mass:  1, tension:  210, friction:  180 },
            ]}
          />
        </Suspense>
      )}
    </>
  );
}
