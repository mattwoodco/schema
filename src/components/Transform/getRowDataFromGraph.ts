import { GraphEdge, GraphNode, GraphNodeTableRow } from '@/types/graph'

export default function getRowDataFromGraph(
  nodes: GraphNode[],
  edges: GraphEdge[]
): GraphNodeTableRow[] {
  const graphElements: GraphNodeTableRow[] = []

  // Convert nodes to graph elements
  nodes?.forEach((node) => {
    const outputEdge = edges.find((edge) => edge.source === node.id)
    const inputEdge = edges.find((edge) => edge.target === node.id)

    const graphNode: GraphNodeTableRow = {
      ...node,
      id: node.id,
      x: node.position.x,
      y: node.position.y,
      name: node.data.label as string,
      label: node.data.label as string,
      type: 'node',
    }

    if (outputEdge) {
      graphNode.output = outputEdge.id
    }

    if (inputEdge) {
      graphNode.input = inputEdge.id
    }

    graphElements.push(graphNode)
  })

  // Convert edges to graph elements
  edges?.forEach((edge) => {
    const sourceNode = nodes.find((node) => node.id === edge.source)
    const targetNode = nodes.find((node) => node.id === edge.target)

    const graphEdge: GraphNodeTableRow = {
      id: edge.id,
      label: `Edge ${edge.id}`,
      input: sourceNode?.id,
      output: targetNode?.id,
      type: 'edge',
    }

    graphElements.push(graphEdge)
  })

  return graphElements
}
