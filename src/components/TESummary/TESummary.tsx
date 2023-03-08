const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

const formatNumber = (value: number) => {
  return currency.format(value)
}

export const TESummary = ({ totalTE }: { totalTE: number }) => {
  if (!totalTE) return null

  return (
    <div className="-mt-32 mx-10">
      <div className="text-xl">Total TE</div>
      <div className="text-6xl">{formatNumber(totalTE)}</div>
    </div>
  )
}
