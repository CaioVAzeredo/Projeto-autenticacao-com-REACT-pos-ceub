import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "claro";
  });

  const alternarTema = () => {
    setTema((tema) => (tema === "claro" ? "escuro" : "claro"));
  };

  useEffect(() => {
    localStorage.setItem("tema", tema);
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      <div className={`app ${tema}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};


export const useTema = () => useContext(ThemeContext);
