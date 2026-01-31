import ElapsedTime from "@/components/elapsed-time";

export default function Page() {
  const background = `bg-[url('/mobile_background.jpg')] md:bg-[url('/desktop_background.jpg')] bg-no-repeat bg-cover bg-center bg-fixed`
  const shadow = 'shadow-[4px_4px_8px_#666666,-4px_-4px_6px_#ffffff]'
  const hover = 'hover:shadow-none hover:inset-shadow-[-4px_4px_8px_#666666,4px_-4px_6px_#ffffff]'

  return (
      <div className={`h-screen w-screen ${background}`}>
        <div className={`absolute bottom-1/10 w-full flex flex-row justify-center`}>
          <div className={`bg-white/15 rounded-3xl p-5 w-4/5 md:w-7/10 font-bold backdrop-blur-xs text-black ${shadow} ${hover}`}>
            <ElapsedTime/>
          </div>
        </div>
      </div>
  )
}