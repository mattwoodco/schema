'use client'

import { Dialog } from '@headlessui/react'
import { useEffect, useRef } from 'react'
// @ts-ignore
import ReadMeContent from '../../../README.md'

export const HelpModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const panel = useRef<HTMLDivElement>(null)
  // scroll to the top of the panel when the modal opens, after half a second
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        panel.current?.scrollTo(0, 0)
      }, 100)
    }
  })
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-60 dialog-style"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center pt-8 px-2 md:p-24 flex-col h-full">
        <Dialog.Panel
          ref={panel}
          className="max-w-screen-lg mx-auto panel-modal flex-1 rounded flex-col flex  w-full p-6 md:p-12 overflow-y-auto"
        >
          <div className="flex">
            <div className="ml-auto">
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </div>
          <ReadMeContent />

          <div className="flex gap-10 mt-auto ml-auto">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button
              onClick={() =>
                confirm('This will close the dialog') && setIsOpen(false)
              }
            >
              Deactivate
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
