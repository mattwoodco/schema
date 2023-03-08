'use client'

import { columnDefs } from '@/components/DataTable/columnDefs'
import { DataTable } from '@/components/DataTable/DataTable'
import NewFlow from '@/components/FlowGraph/NewFlow'
import { TableToggle } from '@/components/TESummary/TableToggle'
import { TESummary } from '@/components/TESummary/TESummary'
import { ProcessGraph } from '@/types/graph'
import { ViewMode } from '@/types/preferences'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowProvider,
} from 'reactflow'
import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import getRowDataFromGraph from './getRowDataFromGraph'

export type RFState = {
  edges: Edge[]
  isTableVisible: boolean
  loadEdges: (edges: Edge[]) => void
  loadNodes: (nodes: Node[]) => void
  loadRowData: (rowData: any[]) => void
  nodes: Node[]
  onConnect: OnConnect
  onEdgesChange: OnEdgesChange
  onNodesChange: OnNodesChange
  rowData: any[]
  toggleTable: () => void
}

export const selector = (state: RFState) => ({
  edges: state.edges,
  isTableVisible: state.isTableVisible,
  loadEdges: state.loadEdges,
  loadNodes: state.loadNodes,
  loadRowData: state.loadRowData,
  nodes: state.nodes,
  onConnect: state.onConnect,
  onEdgesChange: state.onEdgesChange,
  onNodesChange: state.onNodesChange,
  rowData: state.rowData,
  toggleTable: state.toggleTable,
})
// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => {
  return {
    nodes: [],
    edges: [],
    rowData: [],

    loadNodes: (nodes: Node[]) => {
      set({
        nodes,
      })
    },
    loadEdges: (edges: Edge[]) => {
      set({
        edges,
      })
    },

    loadRowData: (rowData: any[]) => {
      set({
        rowData,
      })
    },

    onNodesChange: (changes: NodeChange[]) => {
      const nodes = applyNodeChanges(changes, get().nodes as Node[])
      const transformedRowData = getRowDataFromGraph(nodes, get().edges)
      const rowData = transformedRowData.map((row: any) => {
        const existingRow = get().rowData.find(
          (existingRow) => existingRow.id === row.id
        )
        return {
          ...existingRow,
          ...row,
        }
      })
      set({ nodes, rowData })
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      const edges = applyEdgeChanges(changes, get().edges)
      const rowData = getRowDataFromGraph(get().nodes, edges)
      set({ edges, rowData })
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges),
      })
    },
    toggleTable: () => {
      set({
        isTableVisible: !get().isTableVisible,
      })
    },
    isTableVisible: true,
  }
})

export default function Transform({
  initialData,
  preferences,
}: {
  initialData: {
    rowData: any[]
    graphData: ProcessGraph
  }
  preferences: {
    viewMode: ViewMode
    isTableVisible: boolean
  }
}) {
  const {
    loadNodes,
    loadEdges,
    loadRowData,
    onEdgesChange,
    onNodesChange,
    onConnect,
    edges,
    nodes,
    toggleTable,
    rowData,
    isTableVisible,
  } = useStore(selector, shallow)

  useEffect(() => {
    if (!(edges.length > 0) && !(nodes.length > 0) && !(rowData?.length > 0)) {
      loadNodes(initialData.graphData.nodes as any)
      loadEdges(initialData.graphData.edges)

      console.log(
        '🚀 ~ file: Transform.tsx:140 ~ useEffect ~ initialData.rowData:',
        initialData.rowData
      )
      loadRowData(initialData.rowData)
    }
  }, [initialData])

  return (
    <>
      <ReactFlowProvider>
        <NewFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
        />
      </ReactFlowProvider>
      {rowData && (
        <motion.div
          className="fixed w-full h-full min-h-screen-ios snap-y snap-mandatory overflow-auto top-0 bottom-0 left-0 right-0 scrollbar-hide justify-end flex flex-col pointer-events-none z-50"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <motion.div
            className="border-t-2 border-gray-900 relative"
            initial={{ top: '40vh' }}
            animate={{
              top: isTableVisible ? 0 : '40vh',
            }}
            exit={{
              top: '40vh',
            }}
          >
            <div className="flex">
              <TESummary totalTE={101.5} />
              <div className="ml-auto pr-5">
                <TableToggle
                  onClick={() => {
                    toggleTable()
                  }}
                  open={isTableVisible}
                />
              </div>
            </div>
            <motion.div className="relative z-20 overflow-x-auto pointer-events-auto px-10 backdrop-blur-2xl dark:bg-black dark:bg-opacity-50 text-xl">
              <div className="w-full mr-20 pb-10 flex">
                <DataTable rowData={rowData} columnDefs={columnDefs} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
