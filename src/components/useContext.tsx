import { useLanguage } from "../provider/LanguagesContext"

const translation :Record<string,string> = {
  en: "React 19 Context API",
  mm: "မြန်မာဘာသာ",
  jp: "日本語",
  ch: "中文",
}

const App = () => {
const {languages,changeLanugages} = useLanguage()
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React 19 Context API</h1>

    <select value={languages} onChange={(e) => changeLanugages(e.target.value)}>
      <option value="en">English</option>
      <option value="mm">Myanmar</option>
      <option value="jp">Japan</option>
      <option value="ch">China</option>
    </select>

      <p>Current Language: <span>{translation[languages]}</span></p>
      
      
    </div>
  )
}

export default App