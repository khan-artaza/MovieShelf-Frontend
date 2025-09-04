import React, { useEffect, useState } from 'react'

const LightDarkTheme = () => {
    const [theme, setTheme] = useState(()=>{
        return localStorage.getItem("theme") || 'dark'
      })
    
      useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem("theme", theme)
      },[theme])
    
      const toggleTheme = () => {
        setTheme((prev)=> prev == 'dark' ? 'light' : 'dark' )
      }
    
  return (
    <button onClick={toggleTheme} className='bg-red-500 text-2xl font-semibold px-4 py-2 rounded-2xl'>Set {theme=="dark" ? "Light" : "Dark"} theme</button>
  )
}

export default LightDarkTheme
