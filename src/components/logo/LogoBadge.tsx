'use client'

import { useTheme } from 'next-themes'

const LogoBadge = (props: {
  className?: string
  style?: React.CSSProperties
}) => {
  const theme = useTheme()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 110 110"
      key={`theme-${theme}`}
      className="w-full"
      {...props}
    >
      <path fill="#81B19A" d="M0 0h110v110H0z" />
      <path
        fill="#fff"
        d="M54.644 82c-3.6 0-6.721-.589-9.362-1.767-2.64-1.177-4.681-2.85-6.121-5.017-1.393-2.214-2.113-4.805-2.161-7.773h9.002c0 2.12.768 3.792 2.305 5.017 1.584 1.178 3.72 1.767 6.409 1.767 2.593 0 4.61-.59 6.05-1.767 1.488-1.178 2.232-2.803 2.232-4.876 0-1.743-.528-3.25-1.584-4.523-1.009-1.319-2.473-2.214-4.393-2.685l-6.05-1.625c-4.129-1.037-7.321-2.898-9.578-5.583-2.209-2.685-3.313-5.936-3.313-9.752 0-2.92.672-5.465 2.017-7.632 1.344-2.167 3.24-3.84 5.689-5.017C48.283 29.589 51.211 29 54.572 29c5.09 0 9.122 1.296 12.099 3.887 2.976 2.544 4.489 5.983 4.537 10.317h-9.002c0-2.026-.672-3.604-2.017-4.735-1.344-1.177-3.24-1.766-5.689-1.766-2.352 0-4.177.541-5.473 1.625-1.297 1.084-1.945 2.615-1.945 4.593 0 1.79.48 3.322 1.44 4.594 1.009 1.225 2.45 2.096 4.322 2.614l6.265 1.696c4.177 1.037 7.37 2.898 9.578 5.583C70.896 60.046 72 63.32 72 67.231c0 2.92-.72 5.512-2.16 7.773-1.44 2.214-3.457 3.934-6.05 5.159C61.197 81.388 58.15 82 54.644 82Z"
      />
    </svg>
  )
}

export { LogoBadge }
