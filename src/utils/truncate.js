/**
 * Trunca un string a una longitud máxima.
 * @param {string} str - Texto a truncar
 * @param {number} max - Longitud máxima
 * @returns {string}
 */
export const truncate = (str, max = 100) =>
  str && str.length > max ? `${str.slice(0, max)}...` : str || "";
