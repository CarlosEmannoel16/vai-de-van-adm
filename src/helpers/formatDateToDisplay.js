export const formatDateToDisplay = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {}, "dd/MM/yyyy");
};

export const formatDateToInputUpdate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};
