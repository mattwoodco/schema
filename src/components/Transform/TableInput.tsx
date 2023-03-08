'use client'
import { GraphEdge, GraphNode } from '@/types/graph'

export const TableInput = ({
  rowData,
  nodes,
  edges,
}: {
  rowData: any[]
  nodes: GraphNode[]
  edges: GraphEdge[]
}) => {
  return (
    <div className="flex  w-full">
      <div className="flex-1">
        Input
        <pre>{JSON.stringify(rowData, null, 2)}</pre>
      </div>
      <div className="flex-1">
        Output Expected
        <div>
          <pre>{JSON.stringify(nodes, null, 2)}</pre>
          <pre>{JSON.stringify(edges, null, 2)}</pre>
        </div>
      </div>
      <div className="flex-1">
        Current
        <pre>{JSON.stringify(nodes, null, 2)}</pre>
        <pre>{JSON.stringify(edges, null, 2)}</pre>
      </div>
    </div>
  )
}
