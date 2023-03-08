// This model creates and manages a user in the database
import { Prisma } from '@prisma/client'
import { prisma as db } from '../../prisma/client'

export const getAllUsers = async () => await db.user.findMany()

export const createUserWithEmail = async (email: string) =>
  await db.user.create({
    data: {
      email,
      role: 'GUEST',
    },
  })

export const getUserByEmail = async (email: string) =>
  await db.user.findUnique({
    where: {
      email,
    },
  })

export const getUser = async (id: string) =>
  await db.user.findUnique({
    where: {
      id,
    },
  })

export const updateUser = async (id: string, data: Prisma.UserUpdateInput) =>
  await db.user.update({
    where: {
      id,
    },
    data,
  })

export const deleteUser = async (id: string) =>
  await db.user.delete({ where: { id } })
