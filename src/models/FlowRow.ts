import { ProcessGraph } from '@/types/graph'
// This model creates and manages a user in the database
import getGraphFromRowData from '@/components/Transform/getGraphFromRowData'
import { GraphNodeTableRow } from '@/types/graph'
import { FlowRow } from '@prisma/client'
import { prisma as db } from 'prisma/client'

export const getAllFlowRows = async (): Promise<FlowRow[]> =>
  await db.flowRow.findMany()

export const upsertAllFlowRows = async (flowRows: FlowRow[]): Promise<void> => {
  for (const flowRow of flowRows) {
    await db.flowRow.upsert({
      where: { id: flowRow.id },
      update: flowRow,
      create: flowRow,
    })
  }
}

export const getAllFlowRowsAndGraphData = async (): Promise<{
  rowData: FlowRow[]
  graphData: ProcessGraph
}> => {
  const rowData = await db.flowRow.findMany()
  const graphData = getGraphFromRowData(
    rowData as unknown as GraphNodeTableRow[]
  )
  return {
    rowData,
    graphData,
  }
}

export const upsertFlowRow = async (flowRow: FlowRow): Promise<void> => {
  await db.flowRow.upsert({
    where: { id: flowRow.id },
    update: flowRow,
    create: flowRow,
  })
}
