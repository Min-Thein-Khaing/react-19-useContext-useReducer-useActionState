import { useEffect, useState } from 'react'

const App = () => {
  const [isStart, setIsStart] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  
  useEffect(()=> {
    let timer : ReturnType<typeof setTimeout> 
    if (isStart) {
      timer = setTimeout(() => {
        setIsExpired(true)
        setIsStart(false)
      }, 5000)
    }

    return () => {
      clearTimeout(timer)
    }
  })

  const handleToggle = () => {
    setIsStart(prev => !prev)
    setIsExpired(false)
  }
  
  return (
    <div>
      <h1>Timer</h1>

      {isStart && !isExpired && <p>Timer is running...</p>}
      {isExpired && <p>Timer has expired!</p>}

      <button onClick={handleToggle}>
        {isStart ? 'Stop timer' : 'Start timer'}
      </button>
    </div>
  )
}

export default App