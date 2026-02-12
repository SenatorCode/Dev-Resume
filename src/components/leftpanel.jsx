import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function SectionSetUp({
  sectionName,
  sectionIcon,
  children,
  sectionOpen = false,
}) {
  let open = sectionOpen
  const [isOpen, setIsOpen] = useState(open)

  function handleClick() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
      <div
        onClick={handleClick}
        className="flex h-12 w-full cursor-pointer items-center gap-3 border-b border-slate-700 bg-slate-800 px-4 transition-all duration-200 hover:bg-slate-700"
      >
        <span className="h-6 w-6 text-blue-500">{sectionIcon}</span>
        <span className="text-base font-semibold text-slate-100">
          {sectionName}
        </span>
        <div className="flex-1"></div>
        {isOpen ? (
          <ChevronUp
            size={18}
            className="h-5 w-5 text-slate-400 transition-transform duration-300"
          />
        ) : (
          <ChevronDown
            size={18}
            className="h-5 w-5 text-slate-400 transition-transform duration-300"
          />
        )}
      </div>
      {isOpen && children}
    </div>
  )
}

export function PersonalProfile() {
  const inputClass =
    'w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 focus:border-blue-500 focus:outline-none'

  const labelClass =
    'mb-2 block text-xs font-medium tracking-wide text-slate-400 uppercase'

  return (
    <div className="space-y-4 border-t border-slate-700 px-4 py-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Alex Rivera"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="jobTitle" className={labelClass}>
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            placeholder="Senior Fullstack Engineer"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="alex.rivera@dev.io"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>
          Location
        </label>
        <input
          id="location"
          type="text"
          placeholder="San Francisco, CA"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Professional Summary
        </label>
        <textarea
          id="summary"
          placeholder="Write a brief overview of your professional background..."
          className={
            inputClass + ' resize-vertical max-h-[300px] min-h-[100px]'
          }
        />
      </div>
    </div>
  )
}
