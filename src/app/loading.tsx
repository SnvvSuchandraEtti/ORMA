export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* ORMA logo spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-[#EBEBEB] dark:border-[#3D3D3D]" />
          <div className="absolute inset-0 rounded-full border-[3px] border-t-[#0071E3] animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-[#0071E3] font-bold text-xs tracking-wider">
            O
          </span>
        </div>
        <p className="text-sm text-[#717171] dark:text-[#A0A0A0] animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}
