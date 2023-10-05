export default function LoadingComponent() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-black opacity-50">
      <span
        className="mx-auto my-80 block  text-7xl font-bold text-white opacity-80 
      before:inline-block before:animate-loadingl before:content-['>ag'] after:inline-block after:animate-loadingr after:content-['ua<']"
      >
        <span> </span>
      </span>
    </div>
  )
}
