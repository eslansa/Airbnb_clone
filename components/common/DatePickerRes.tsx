"use client"
import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

// Define los tipos de las props
interface DatePickerResProps {
  date: Date | undefined; // Permite que date sea undefined inicialmente
  setDate: (date: Date | undefined) => void; // Define el tipo de la función setDate
}

// Usa los tipos definidos en las props del componente
export function DatePickerRes({ date, setDate }: DatePickerResProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* Utiliza el operador de coalescencia nula para asegurarte de que selected siempre sea un Date */}
        <Calendar
          mode="single"
          selected={date ?? new Date()} // Asegura que selected siempre sea un Date
          onSelect={setDate}
          initialFocus
        />

      </PopoverContent>
    </Popover>
  );
}
