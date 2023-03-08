import { FiChevronDown } from 'react-icons/fi'

export const TableToggle = ({
  onClick,
  open,
}: {
  onClick: () => void
  open: boolean
}) => {
  return (
    <div className="-mt-24">
      <button
        className="btn btn-outline pointer-events-auto border-4"
        onClick={onClick}
      >
        <div className="text-2xl">
          {open ? (
            <FiChevronDown />
          ) : (
            <FiChevronDown className="transform rotate-180" />
          )}
        </div>
      </button>
    </div>
  )
}
