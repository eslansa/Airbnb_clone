import { bytesToMB } from "@/lib/utils";
import * as yup from "yup";

export const ResSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    apellidos: yup.string().required(),
    telef: yup.number().required().typeError("Inserte un numero de telefono valido"),
    date_ini: yup.date(),
    date_fin: yup.date(),
    pay: yup.string().required(),
    num_person:  yup.number().required().typeError("Inserte un numero de personas valido"),
  })
  .required();

export type ResSchemaType = yup.InferType<typeof ResSchema>;
