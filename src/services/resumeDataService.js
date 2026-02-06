const RESUME_DATA_URL = "/resumeData.json";

/**
 * Obtiene los datos del portafolio desde el JSON estático.
 * @returns {Promise<Object>} Datos del portafolio
 */
export const fetchResumeData = async () => {
  const response = await fetch(RESUME_DATA_URL);
  if (!response.ok) {
    throw new Error(`Error al cargar datos: ${response.status}`);
  }
  return response.json();
};
