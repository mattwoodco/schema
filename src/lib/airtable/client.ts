import Airtable from 'airtable'

declare global {
  var airtable: Airtable | undefined
}

export const airtable =
  global.airtable ||
  new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  })

if (process.env.NODE_ENV !== 'production') global.airtable = airtable
