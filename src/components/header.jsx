import { Braces, Sun, Download } from 'lucide-react'

export default function Header() {
  return (
    <>
      <header className="fixed top-0 z-50 h-16 w-full border-b border-slate-700 bg-slate-900 shadow-md">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-500 p-1.5">
              <Braces className="h-4 w-4 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-100">
              DevResume
            </span>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="h-10 w-10 cursor-pointer p-2 text-slate-400 transition-colors duration-150 hover:text-slate-100"
            >
              <Sun className="h-5 w-5" />
            </button>
            <div className="h-6 w-px bg-slate-700"></div>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600 active:bg-blue-800"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
