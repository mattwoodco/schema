import ReactFlow, { Background, Node, Position } from 'reactflow'

import { RFState } from '@/components/Transform/Transform'
import 'reactflow/dist/style.css'

export default function NewFlow({
  nodes,
  edges,
  onNodesChange,
  onConnect,
  onEdgesChange,
}: Pick<
  RFState,
  'nodes' | 'edges' | 'onNodesChange' | 'onConnect' | 'onEdgesChange'
>) {
  return (
    <div className="w-full h-full fixed top-0 left-0 right-0 z-10">
      <div className="absolute">
        {/* isSearching: {isSearching ? 'true' : 'false'} */}
      </div>
      <ReactFlow
        nodes={nodes?.map((node: Node) => ({
          ...node,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
      </ReactFlow>
    </div>
  )
}
