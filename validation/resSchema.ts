import { bytesToMB } from "@/lib/utils";
import * as yup from "yup";

export const ResSchema = yup
  .object()
  .shape({
    date_ini: yup.date(),
    date_fin: yup.date(),
    pay: yup.string().required(),
    num_person:  yup.number().required().typeError("Amount should be number"),
  })
  .required();

export type ResSchemaType = yup.InferType<typeof ResSchema>;
