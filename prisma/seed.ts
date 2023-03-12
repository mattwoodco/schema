// @ts-check
import { prisma } from './client'

async function seedGuests() {
  const emails = process.env.SEED_GUESTS?.split(',')
  if (emails) {
    for (const email of emails) {
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: email,
          email,
        },
      })
    }
  }
}
async function seedMembers() {
  const emails = process.env.SEED_MEMBERS?.split(',')
  if (emails) {
    for (const email of emails) {
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: email,
          email,
          role: 'MEMBER',
        },
      })
    }
  }
}

async function seedPartners() {
  const emails = process.env.SEED_PARTNERS?.split(',')
  if (emails) {
    for (const email of emails) {
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: email,
          email,
          role: 'PARTNER',
        },
      })
    }
  }
}

async function seedAdmins() {
  const emails = process.env.SEED_ADMINS?.split(',')
  if (emails) {
    for (const email of emails) {
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: email,
          email,
          role: 'ADMIN',
        },
      })
    }
  }
}
// async function seedFlowTableRows() {
//   const defaultTable: any = seedNodes 
//   for (const row of defaultTable) {
//     await prisma.flowRow.create({
//       data: {
//         ...row,
//         name: row.label,
//         type: row.type,
//         // isMaitenanceSat: faker.helpers.arrayElement([true, false]),
//         // isOperatingConditionsSat: faker.helpers.arrayElement([true, false]),
//         // isEnvironmentSat: faker.helpers.arrayElement([true, false]),
//         // isOperatorsSat: faker.helpers.arrayElement([true, false]),
//         // isHistorySat: faker.helpers.arrayElement([true, false]),
//         // isSafetyDeviceSat: faker.helpers.arrayElement([true, false]),
//         // isContingencyPlanSat: faker.helpers.arrayElement([true, false]),

//         // id: row.id,
//         // x: row.x || 0,
//         // y: row.y || 0,
//         // type: row.type,
//         // label: row.label,
//         // input: row.input || '',
//         // output: row.output || '',
//       },
//     })
//   }
// }

async function main() {
  await seedGuests()
  await seedMembers()
  await seedPartners()
  await seedAdmins()

  console.log(`Done seeding the database ... `)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
