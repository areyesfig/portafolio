import { useState, useEffect } from "react";

const GITHUB_API_BASE = "https://api.github.com";

/**
 * Obtiene los repositorios públicos de un usuario de GitHub.
 * @param {string} username - Usuario de GitHub
 * @param {number} limit - Cantidad máxima de repos a retornar
 * @returns {{ repos: Array, loading: boolean, error: string|null }}
 */
export const useGitHubRepos = (username, limit = 9) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username?.trim()) return;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${GITHUB_API_BASE}/users/${username}/repos?per_page=12&sort=updated&type=owner`
        );
        if (!res.ok) throw new Error("No se pudieron cargar los repositorios");

        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error(data.message || "Respuesta inválida de GitHub");
        }

        const mapped = data
          .filter((r) => !r.fork && !r.archived)
          .slice(0, limit)
          .map((r) => ({
            title: r.name,
            description: r.description || "",
            category: r.language || "",
            language: r.language,
            url: r.html_url,
            stargazers_count: r.stargazers_count,
          }));

        setRepos(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, limit]);

  return { repos, loading, error };
};
