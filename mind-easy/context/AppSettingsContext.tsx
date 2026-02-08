import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "Light" | "Dark";
type Language = "English" | "Ukrainian";

interface AppSettingsContextType {
  theme: Theme;
  language: Language;
  setTheme: (t: Theme) => void;
  setLanguage: (l: Language) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | null>(null);

export const AppSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("Light");
  const [language, setLanguageState] = useState<Language>("English");

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      const savedLang = await AsyncStorage.getItem("language");

      if (savedTheme) setThemeState(savedTheme as Theme);
      if (savedLang) setLanguageState(savedLang as Language);
    })();
  }, []);

  const setTheme = async (t: Theme) => {
    setThemeState(t);
    await AsyncStorage.setItem("theme", t);
  };

  const setLanguage = async (l: Language) => {
    setLanguageState(l);
    await AsyncStorage.setItem("language", l);
  };

  return (
    <AppSettingsContext.Provider value={{ theme, language, setTheme, setLanguage }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) throw new Error("useAppSettings must be used inside provider");
  return ctx;
};