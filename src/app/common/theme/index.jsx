/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";
const AppThemeContext = createContext({ mode: "light", onChangeThemeMode: () => { } });
function AppThemeProvider(props) {
    const { children } = props;
    const [themeMode, setThemeMode] = useState(() => {
        const theme = window.localStorage.getItem("theme");
        return theme ?? "light";
    });
    function handleChangeThemeMode() {
        let theme;
        if (themeMode === "dark")
            theme = "light";
        else
            theme = "dark";
        window.localStorage.setItem("theme", theme);
        setThemeMode(theme);
    }
    function getTheme() {
        return themeMode === "dark" ? darkTheme : lightTheme;
    }
    return (<AppThemeContext.Provider value={{ mode: themeMode, onChangeThemeMode: handleChangeThemeMode }}>
      <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
    </AppThemeContext.Provider>);
}
const useAppTheme = () => useContext(AppThemeContext);
export default AppThemeProvider;
export { useAppTheme, AppThemeContext };
