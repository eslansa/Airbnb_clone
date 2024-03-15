import { bytesToMB } from "@/lib/utils";
import * as yup from "yup";

export const CuadreSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    cant: yup.number().required().typeError("Inserte una cantidad"),
    precio:  yup.number().required().typeError("Inserte un precio"),
  })
  .required();

export type CuadreSchema = yup.InferType<typeof CuadreSchema>;
