// @ts-nocheck
import { Preferences } from '@prisma/client'
import { prisma as db } from 'prisma/client'

// This model creates and manages a user in the database
export const getPreferencesByUserId = async (
  userId: string
): Promise<Preferences | null> => {
  // const user = await db.user.findUnique({
  //   where: {
  //     userId,
  //   },
  // })

  // const allPrefs = await db.preferences.findMany()
  const preferences = await db.preferences.findUnique({
    where: {
      userId,
    },
  })

  return {
    viewMode: 'graph',
    isTableVisible: true,
    ...preferences,
  }
}

// This model creates and manages a user in the database
export const updatePreference = async (
  userId: string,
  preference: string,
  value: any
): Promise<Preferences | null> =>
  await db.preferences.update({
    where: {
      userId,
    },
    data: {
      [preference]: value,
    },
  })

// This model manages user preferences in the database
export const upsertPreferences = async (
  userId: string,
  body: any
): Promise<Preferences | null> => {
  const preferences = await db.preferences.findUnique({
    where: {
      userId,
    },
  })

  if (preferences) {
    try {
      const res = await db.preferences.update({
        where: {
          id: preferences.id,
        },
        data: {
          userId,
          [body.preference]: body.value,
        },
      })
      return res
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
