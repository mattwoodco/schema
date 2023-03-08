export interface GraphNodeTableRow {
  id: string
  x?: number
  y?: number
  name?: string
  label: string
  input?: string
  output?: string
  type: 'node' | 'edge'
}

export interface GraphNode {
  id: string
  position: { x?: number; y?: number }
  data: { label?: string }
}

export interface GraphEdge {
  id: string
  source: string
  target: string
}

export interface ProcessGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
