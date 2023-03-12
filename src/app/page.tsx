import Editor from '@/components/Editor/Editor'
import { getAuthOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function AppEntry() {
  const session = await getServerSession(getAuthOptions())
  console.log('🚀 ~ file: page.tsx:11 ~ AppEntry ~ session:', session)

  return <Editor />
}
