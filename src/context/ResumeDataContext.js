import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchResumeData } from "../services";

const ResumeDataContext = createContext(null);

export const useResumeData = () => {
  const context = useContext(ResumeDataContext);
  if (!context) {
    throw new Error("useResumeData debe usarse dentro de ResumeDataProvider");
  }
  return context;
};

export const ResumeDataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResumeData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const value = { data, loading, error };

  return (
    <ResumeDataContext.Provider value={value}>
      {children}
    </ResumeDataContext.Provider>
  );
};
