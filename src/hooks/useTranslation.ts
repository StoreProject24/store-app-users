import es from "../locales/es.json"
import en from "../locales/en.json"
import { useStoreStore } from "@/store/store"

type File = keyof typeof en

const useTranslation = () => {
  const { language, languages, setLanguage } = useStoreStore()

  const t = (key: File): string => {
    const translations = {
      en,
      es,
    }
    return translations[language][key] ?? ""
  }

  return {
    language,
    languages,
    setLanguage,
    t,
  }
}

export default useTranslation
