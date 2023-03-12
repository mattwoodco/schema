'use client'

import { useTheme } from 'next-themes'

const LogoCharacter = (props: {
  className?: string
  style?: React.CSSProperties
}) => {
  const theme = useTheme()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 63"
      fill="none"
      key={`theme-${theme}`}
      className="w-full"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.197 63 0 0h9.718L19.96 41.943a112.878 112.878 0 0 1 1.664 7.421c.525 2.417.904 4.316 1.138 5.696l.963-5.696a124.38 124.38 0 0 1 1.663-7.508L35.545 0H45L28.716 63h-12.52Z"
      />
    </svg>
  )
}
export { LogoCharacter }
