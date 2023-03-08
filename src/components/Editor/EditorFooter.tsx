'use client'

import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useState } from 'react'
import { IoIosHelpCircleOutline as IoIos, IoIosShareAlt } from 'react-icons/io'
import { HelpModal } from './HelpModal'

export default function EditorFooter({
  onShareClick,
}: {
  onShareClick?: () => void
}) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <footer className="border-background-darker border-t-2 bg-background-dark">
      <div className="max-w-screen-lg mx-auto flex justify-center gap-2 md:gap-5 items-center px-6 flex-col md:flex-row">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="py-6 appearance-none bg-transparent border-none text-current font-semibold flex gap-2 items-center"
        >
          <div className="text-3xl">
            <IoIos />
          </div>
          <span>Help</span>
        </button>

        <span className="sr-hidden hidden md:block opacity-30">/</span>
        <ThemeSwitcher />
        <span className="sr-hidden hidden md:block opacity-30">/</span>
        <button
          onClick={onShareClick}
          className="py-6 appearance-none bg-transparent border-none text-current font-semibold flex gap-2 items-center disabled:opacity-30"
          disabled={!onShareClick}
        >
          <div className="text-3xl">
            <IoIosShareAlt />
          </div>
          <span>Share</span>
        </button>
        <HelpModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </footer>
  )
}
