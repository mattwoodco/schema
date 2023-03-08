'use client'

import { useTheme } from 'next-themes'
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="pointer-events-auto text-xl appearance-none border-0 leading-[0em] cursor-pointer "
      style={{
        background: 'transparent',
        color: 'currentcolor',
      }}
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {theme === 'dark' ? <MdOutlineLightMode /> : <MdLightMode />}
    </button>
  )
}

export default ThemeSwitcher
