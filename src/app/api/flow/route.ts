import { getAllFlowRowsAndGraphData, upsertFlowRow } from '@/models/FlowRow'

export async function GET() {
  const { rowData, graphData } = await getAllFlowRowsAndGraphData()
  return new Response(JSON.stringify({ rowData, graphData }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
}
export async function POST(request: Request) {
  const body = await request.json()

  try {
    const result = await upsertFlowRow(body)

    return new Response('good to go', {
      status: 200,
    })
  } catch (error) {
    return new Response('something went wrong', {
      status: 500,
    })
  }
}
