import * as yup from "yup";

export const validateCreateTravel = async (data) => {
  await yup
    .object()
    .shape({
      arrivalDate: yup.string().required("Data de Chegada é obrigatório"),
      departureDate: yup.string().required("Data de Partida é obrigatório"),
      description: yup.string().required("Descrição é obrigatório"),
      driverId: yup.string().required("Motorista é obrigatório"),
      idVehicle: yup.string().required("Veiculo é obrigatório"),
      routeId: yup.string().required("Rota é obrigatório"),
    })
    .validate(data, {
      abortEarly: true,
    });
};
