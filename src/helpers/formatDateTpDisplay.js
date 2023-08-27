export const formatDateToDisplay = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {}, "dd/MM/yyyy");
};
