'use client'

import { GraphEdge, GraphNode } from '@/types/graph'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState, useTransition } from 'react'
import ReactFlow, {
  addEdge,
  Node,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow'

interface FlowProps {
  graph: {
    nodes: GraphNode[]
    edges: GraphEdge[]
  }
  onNodesChange?: any
  onEdgesChange?: any
  onConnect?: any
  rotate?: boolean
  layerLevel?: number

  [key: string]: any
}

const proOptions = { hideAttribution: true }

const getId = () => nanoid()

function StandaloneFlow({ graph }: FlowProps) {
  const router = useRouter()
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null)
  const connectingNodeId = useRef<string | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(
    graph.nodes as unknown as Node<
      { label?: string | undefined },
      string | undefined
    >[]
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges)
  const { project } = useReactFlow()
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId
  }, [])

  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  // Create inline loading UI
  const isMutating = isFetching || isPending

  const handleChange = useCallback(
    async ({ nodes, edges }: any) => {
      setIsFetching(true)
      // Mutate external data source
      try {
        const body = JSON.stringify({ nodes, edges })
        await axios.post('/api/flow', body)
      } catch (error) {
        console.log(error)
      }

      setIsFetching(false)

      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
    },
    [nodes, edges, setEdges, startTransition, setIsFetching]
  )

  const onConnectEnd = useCallback(
    (event: any) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane')
      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } =
          reactFlowWrapper.current?.getBoundingClientRect() || {
            top: 0,
            left: 0,
          }
        const id = getId()
        const newNode = {
          id,
          // we are removing the half of the node width (75) to center the new node
          position: project({
            x: event.clientX - left - 75,
            y: event.clientY - top,
          }),
          data: { label: `Node ${id}` },
        }

        const newNodes = graph.nodes.concat(newNode)
        const newEdges = edges.concat({
          id,
          source: connectingNodeId.current as string,
          target: id,
        })

        handleChange({
          nodes: newNodes,
          edges: newEdges,
        })
      }
    },
    [
      connectingNodeId,
      project,
      reactFlowWrapper,
      setEdges,
      setNodes,
      nodes,
      edges,
    ]
  )

  return (
    <div
      className="w-full h-full fixed top-0 left-0 right-0 z-10"
      ref={reactFlowWrapper}
      style={{ opacity: !isMutating ? 1 : 0.7 }}
    >
      <ReactFlow
        nodes={
          graph.nodes as unknown as Node<any, string | undefined>[] | undefined
        }
        edges={graph.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesDraggable={true}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView={false}
        proOptions={proOptions}
      />
    </div>
  )
}

export default StandaloneFlow
