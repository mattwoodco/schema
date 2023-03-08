'use client'
import { Dialog } from '@headlessui/react'
import ReadMeContent from './README.mdx'

export const HelpModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
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

      <div className="fixed inset-0 flex items-center justify-center p-24 flex-col h-full">
        <Dialog.Panel className="max-w-screen-lg mx-auto panel-modal flex-1 rounded flex-col flex  w-full p-12 overflow-y-auto">
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
