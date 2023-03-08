// import { getSummarizedReleases } from '@/models/Release'
// import { Release } from '@prisma/client'

export default async function GuestArea() {
  // const previewReleases = await getSummarizedReleases()
  return (
    <div className="p-32 flex flex-col gap-10">
      <div>
        <h3 className="text-[6vh]">Guest Area</h3>
        <p className="text-2xl">Preview Releases</p>
      </div>

      {/* <section className="flex flex-col gap-5 max-w-screen-xs max-w-md">
        {previewReleases.map((release: Partial<Release>) => (
          <a
            aria-label={`Preview ${release.title}`}
            href={`/release/${release.id}`}
            key={release.id}
            className="text-2xl border-white border-2 p-5  rounded"
          >
            <h4>{release.title}</h4>
            <p>{release.description}</p>
          </a>
        ))}
      </section> */}
    </div>
  )
}
