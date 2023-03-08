'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const PreferenceToggle = ({
  preference,
  value,
}: {
  preference: string
  value: boolean
}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(
    () => {
      const value = axios.post('/api/preferences', {
        preference,
        value: !preference,
      })
      return value
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['preferences'])
      },
    }
  )
  return (
    <button onClick={() => mutation.mutate()}>
      {value ? 'Hide' : 'Show'} {preference}
    </button>
  )
}
