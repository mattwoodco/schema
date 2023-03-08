import { getAllFlowRowsAndGraphData } from '@/models/FlowRow'

export async function GET() {
  const { rowData, graphData } = await getAllFlowRowsAndGraphData()
  return new Response(JSON.stringify({ rowData, graphData }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
}
export async function POST(request: Request) {
  const body = await request.json()

  if (body.type === 'node') {
    return new Response('node')
  }
  if (body.type === 'edge') {
    return new Response('edge')
  }
}
