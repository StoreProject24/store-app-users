import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<string>("");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.remove("light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(currentTheme);
  }, []);


  return { theme, toggleTheme };
};

export default useTheme;