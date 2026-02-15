import { Braces, Sun, Moon, Download } from 'lucide-react'

export default function Header({ isDark, onThemeToggle }) {
  const handleDownloadPDF = () => {
    const element = document.querySelector('[data-resume-preview]')
    if (!element) {
      alert('No resume to download')
      return
    }
    const html2pdf = window.html2pdf
    if (!html2pdf) {
      alert('PDF library not loaded')
      return
    }
    const options = {
      margin: 10,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    }
    html2pdf().set(options).from(element).save()
  }

  return (
    <header
      className="fixed top-0 z-50 h-16 w-full border-b shadow-md"
      style={{
        borderColor: isDark ? '#334155' : '#E2E8F0',
        backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
      }}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500 p-1.5">
            <Braces className="h-5 w-5 text-white" />
          </div>
          <div>
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
            >
              DevResume
            </span>
            <p
              className="text-xs font-medium"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              Build with ease
            </p>
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <button
            onClick={onThemeToggle}
            className="h-10 w-10 cursor-pointer rounded-lg p-2 transition-colors duration-150"
            style={{
              color: isDark ? '#94A3B8' : '#475569',
              backgroundColor: isDark ? '#1e293b' : '#F1F5F9',
            }}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <div
            className="h-6 w-px"
            style={{ backgroundColor: isDark ? '#334155' : '#E2E8F0' }}
          ></div>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600 active:bg-blue-800"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>
      </div>
    </header>
  )
}
