import * as Yup from "yup";

export const driverValidation = (data) => {
  Yup.object({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().required("Email é obrigatório"),
    password: Yup.string().required("Senha é obrigatório"),
    cpf: Yup.string().required("CPF é obrigatório"),
    phone: Yup.string().required("Telefone é obrigatório"),
    date_of_birth: Yup.string().required("Data de Nascimento é obrigatório"),
    cnh: Yup.string().required("CNH é obrigatório"),
    cnhDateOfIssue: Yup.string().required(
      "Data de Emissão da CNH é obrigatório"
    ),
    cnhExpirationDate: Yup.string().required(
      "Data de Validade da CNH é obrigatório"
    ),
  }).validateSync(data, { abortEarly: true });
};
