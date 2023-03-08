import {
  GraphEdge,
  GraphNode,
  GraphNodeTableRow,
  ProcessGraph,
} from '@/types/graph'

export default function parseGraphData(
  input: GraphNodeTableRow[]
): ProcessGraph {
  if (!input) return { nodes: [], edges: [] }
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  input.forEach((item) => {
    if (item.type === 'node') {
      const node: GraphNode = {
        id: item.id!,
        data: {
          label: item.label,
        },
        position: {
          x: item.x || 0,
          y: item.y || 0,
        },
      }
      nodes.push(node)
    } else if (item.type === 'edge') {
      const edge: GraphEdge = {
        id: item.id!,
        source: item.input!,
        target: item.output!,
      }
      edges.push(edge)
    }
  })

  return { nodes, edges }
}
