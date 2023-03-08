'use client'

import { GridReadyEvent } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { FC, RefObject, useCallback, useEffect, useRef } from 'react'
// import { ActionsCellRenderer } from './CellRenderers/ActionsCellRenderer'
// import { AttendeesCellRenderer } from './CellRenderers/AttendeesCellRenderer'
// import { BtnCellRenderer } from './CellRenderers/BtnCellRenderer'
// import { PhotoTextCellRenderer } from './CellRenderers/PhotoTextCellRenderer'
// import { PillCellRenderer } from './CellRenderers/PillCellRenderer'

import './DataTable.css'

import { DataTableProps } from './types'

export const DataTable: FC<
  DataTableProps & { onRef?: (ref: RefObject<AgGridReact>) => void }
> = ({
  columnDefs,
  rowData,
  onDelete,
  actions,
  onEdit,
  onRef,
  // onSelectionChanged,
  ...props
}) => {
  // Entry point for the custom cell render
  // const frameworkComponents = {
  //   btnCellRenderer: BtnCellRenderer,
  //   actionsCellRenderer: ActionsCellRenderer,
  //   photoTextCellRenderer: PhotoTextCellRenderer,
  //   attendeesCellRenderer: AttendeesCellRenderer,
  //   pillCellRenderer: PillCellRenderer,
  // }

  let rows: any[] = []

  // Got to clone the rowData to extend it so could pass his index
  if (rowData) {
    rows = JSON.parse(JSON.stringify(rowData))
    rows.map((row, index) => {
      row.rowIndex = index
      return row
    })
  }

  columnDefs?.map((column) => {
    if (column.customType) {
      // Custom Render for the delete Button
      if (column.customType === 'deleteButton') {
        column.cellRenderer = 'btnCellRenderer'
        column.headerName = ''
        column.cellRendererParams = {
          text: column.buttonText ? column.buttonText : 'Delete',
          className: column.className,
          onClicked: (id: string) => {
            if (onDelete) {
              onDelete(id)
            }
          },
        }
      }

      // Custom Render for the edit Button
      if (column.customType === 'editButton') {
        column.cellRenderer = 'btnCellRenderer'
        column.headerName = 'Actions'
        column.cellRendererParams = {
          text: column.buttonText ? column.buttonText : 'Edit',
          className: column.className,
          onClicked: (id: string) => {
            if (onEdit) {
              onEdit(id)
            }
          },
        }
      }

      // Custom Render for the photo and text column
      if (column.customType === 'photoTextColumn') {
        column.cellRenderer = 'photoTextCellRenderer'
      }

      // Custom Render for the attendees column
      if (column.customType === 'attendeesColumn') {
        column.cellRenderer = 'attendeesCellRenderer'
      }

      // Custom Render for the pill column
      if (column.customType === 'pillColumn') {
        column.cellRenderer = 'pillCellRenderer'
        column.cellRendererParams = {
          field: column.field,
        }
      }

      // Custom Render for the actions column
      if (column.customType === 'actionsColumn') {
        column.cellRenderer = 'actionsCellRenderer'
        column.headerName = ''
        column.cellRendererParams = {
          actions,
          totalRows: rowData?.length,
        }
      }
      return column
    }
    return column
  })

  const defaultColDef = {
    resizable: true,
    headerClass: 'font-semibold uppercase',
    // cellClass: 'px-4',
  }

  // Save a reference to the AGGrid React instance
  const gridRef = useRef<AgGridReact>(null)
  useEffect(() => {
    if (!!onRef && gridRef.current) {
      onRef(gridRef)
    }
  }, [gridRef, onRef])
  // Resize the table, using the AGGrid React instance
  const onGridReady = useCallback((params: GridReadyEvent) => {
    // gridRef.current?.api.sizeColumnsToFit()
  }, [])

  return (
    <div className="ag-data-table  w-full min-h-[33vh]">
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={{
          ...defaultColDef,
          flex: 1,
          minWidth: 120,
          maxWidth: 300,
          editable: true,
          sortable: true,
          filter: true,
          resizable: true,
          headerClass: 'font-semibold uppercase',
        }}
        rowData={rowData}
        rowClass="border-b-2 border-white"
        // rowHeight={80}
        // headerHeight={50}
        animateRows={true}
        onGridReady={onGridReady}
        sortingOrder={['asc', 'desc']}
        // components={frameworkComponents}
        suppressRowTransform={true}
        suppressScrollOnNewData={true}
        suppressPropertyNamesCheck={true}
        // onRowSelected={onSelectionChanged}
        // stopEditingWhenCellsLoseFocus={true}
        // {...props}
      />
    </div>
  )
}
