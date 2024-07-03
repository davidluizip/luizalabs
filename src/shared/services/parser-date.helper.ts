/**
 * Função para converter uma string no formato YYYYMMDD para um objeto Date.
 * @param dateString - String no formato YYYYMMDD a ser convertida.
 * @returns Date - Objeto Date correspondente à data convertida.
 */
export const parseDate = (dateString: string): Date => {
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1;
  const day = parseInt(dateString.slice(6, 8), 10);

  return new Date(year, month, day);
};
