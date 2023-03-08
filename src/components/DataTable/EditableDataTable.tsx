import { FC, useState } from 'react'
import { DataTable } from './DataTable'
import { DataTableAction } from './types'

interface EditableDataTableProps {
  columnDefs?: any[] | null
  label?: string
  onCreate: (name: string) => void
  onCreateLabel?: string
  onDelete: (id: string) => void
  rowData?: any[] | null
  actions?: DataTableAction[] | null
}

const EditableDataTable: FC<EditableDataTableProps> = ({
  columnDefs,
  label = 'Gathers',
  onCreate,
  onCreateLabel = 'Add gather',
  onDelete,
  rowData,
  actions,
}) => {
  const [name, setName] = useState('')
  return (
    <div className={`flex h-full w-full flex-col`}>
      <div className="flex items-center">
        <h1 className="flex-1 px-7 pt-7 text-4xl">{label}</h1>
      </div>

      <form className="flex max-w-xl gap-3 p-7">
        <input
          className={`w-full  rounded border-2 p-3`}
          name={'name'}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button
          className={'whitespace-nowrap  rounded border-2 px-3'}
          onClick={(e) => {
            e.preventDefault()
            onCreate(name)
            setName('')
          }}
        >
          {onCreateLabel}
        </button>
      </form>
      <div className="w-full flex-1 px-7">
        <DataTable
          rowData={rowData != null ? rowData : []}
          columnDefs={columnDefs != null ? columnDefs : []}
          onDelete={(id: any) => onDelete(id)}
          actions={actions}
        />
      </div>
    </div>
  )
}

export { EditableDataTable }
