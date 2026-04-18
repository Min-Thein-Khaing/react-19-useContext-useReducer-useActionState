import { createContext, useState, type ReactNode ,use } from "react";

type LanguageType ={
    languages:string,
    changeLanugages : (lang:string) => void
}


const LanguagesContext = createContext<LanguageType>({
    languages:"en",
    changeLanugages : () => {}
})

export const LanguagesProvider = ({children}:{children:ReactNode}) => {
    const [languages, setLanguages] = useState("en")

    const changeLanugages = (lang:string) => {
        setLanguages(lang)
    }
    return (
        <LanguagesContext value={{ languages, changeLanugages }}>
            {children}
        </LanguagesContext>
    )
}

export const useLanguage = () => use(LanguagesContext)