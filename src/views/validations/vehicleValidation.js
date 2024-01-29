import * as Yup from "yup";

export const vehicleValidation = (data) => {
  Yup.object({
    description: Yup.string().required("Descrição é obrigatório"),
    plate: Yup.string().required("Placa é obrigatório"),
    amount_of_accents: Yup.number().required(
      "Quantidade de acentos é obrigatório"
    ),
    cor: Yup.string().required("Cor é obrigatório"),
    ownerName: Yup.string().required("Proprietário é obrigatório"),
  }).validateSync(data, { abortEarly: true });
};
