import { ColDef } from 'ag-grid-community'
import { AgReactUiProps } from 'ag-grid-react'

export interface ColumnProp extends ColDef {
  headerName?: string
  sortable?: boolean
  filter?: string | boolean
  customType?: string
  cellRenderer?: string | ((params: any) => string)
  cellRendererParams?: {
    text?: string
    onClicked?: (id: string) => void
    actions?: DataTableAction[] | null
    field?: string
    className?: string
    totalRows?: number
  }
  onDelete?: (id: string) => void
  buttonText?: string
  className?: string
}

export interface DataTableAction {
  title: string
  onClicked: (id: string) => void
  onSelectionChanged?: (url: string) => void
}

export interface DataTableProps extends AgReactUiProps {
  columnDefs?: ColumnProp[]
  rowData?: any[] | null
  actions?: DataTableAction[] | null
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  // downloadingState?: UIDownloading[]
}
