import { createContext, useState, useContext } from "react";

// Create Context
const DarkModeContext = createContext();

// Custom Hook for consuming the context
export const useDarkMode = () => useContext(DarkModeContext);

// Provider Component
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);

    // Toggle function
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
