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

function InputField({
  id,
  label,
  placeholder,
  inputClass,
  labelClass,
  type = 'text',
}) {
  return (
    <>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClass}
      />
    </>
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
          <InputField
            id="fullName"
            label="Full Name"
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </div>
        <div>
          <InputField
            id="jobTitle"
            label="Job Title"
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputField
            id="email"
            label="Email"
            inputClass={inputClass}
            labelClass={labelClass}
            type="email"
            placeholder="alex.rivera@gmail.com"
          />
        </div>
        <div>
          <InputField
            id="phone"
            label="Phone"
            inputClass={inputClass}
            labelClass={labelClass}
            type="tel"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div>
        <InputField
          id="location"
          label="Location"
          inputClass={inputClass}
          labelClass={labelClass}
          placeholder="San Francisco, CA"
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

export function LinksSection() {
  const labelClass =
    'mb-2 block text-xs font-medium tracking-wide text-slate-400 uppercase'
  const inputClass =
    'w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 focus:border-blue-500 focus:outline-none'

  return (
    <div className="space-y-4 border-t border-slate-700 px-4 py-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputField
            id="linkedin"
            label="LinkedIn"
            inputClass={inputClass}
            labelClass={labelClass}
            placeholder="https://www.linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <InputField
            id="github"
            label="GitHub"
            inputClass={inputClass}
            labelClass={labelClass}
            placeholder="https://github.com/your-username"
          />
        </div>
        <div>
          <InputField
            id="website"
            label="Portfolio Website"
            inputClass={inputClass}
            labelClass={labelClass}
            placeholder="https://myportfolio.com"
          />
        </div>
        <div>
          <InputField
            id="twitter"
            label="twitter account"
            inputClass={inputClass}
            labelClass={labelClass}
            placeholder="https://your-twitter-account.com"
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 pt-4">
        <button className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-all duration-200 hover:bg-slate-700 active:bg-slate-600">
          Add New Link
        </button>
      </div>
    </div>
  )
}

export function SkillsSection() {
  // State lifting: track which subsection is open
  const [openCategory, setOpenCategory] = useState('languages')
  const [customCategories, setCustomCategories] = useState([])
  const [showModal, setShowModal] = useState(false)

  // Skills data for each category
  const [skills, setSkills] = useState({
    languages: [],
    libraries: [],
    tools: [],
    infrastructure: [],
    other: [],
  })

  const defaultCategories = [
    { id: 'languages', label: 'Languages & Frameworks' },
    { id: 'libraries', label: 'Libraries' },
    { id: 'tools', label: 'Tools' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'other', label: 'Other Skills' },
  ]

  const allCategories = [...defaultCategories, ...customCategories]

  // Add skill to category
  const addSkill = (categoryId, skill) => {
    if (!skill.trim()) return
    setSkills((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), skill],
    }))
  }

  // Remove skill from category
  const removeSkill = (categoryId, index) => {
    setSkills((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].filter((_, i) => i !== index),
    }))
  }

  // Add custom category
  const handleAddCustomCategory = (categoryName) => {
    if (categoryName && categoryName.trim()) {
      const newCategory = {
        id: `custom_${Date.now()}`,
        label: categoryName,
      }
      setCustomCategories((prev) => [...prev, newCategory])
      setSkills((prev) => ({
        ...prev,
        [newCategory.id]: [],
      }))
      setOpenCategory(newCategory.id)
    }
    setShowModal(false)
  }

  // Collect all skill values
  const getSkillsData = () => {
    return allCategories.reduce((acc, category) => {
      acc[category.id] = {
        label: category.label,
        skills: skills[category.id] || [],
      }
      return acc
    }, {})
  }

  const ui = (
    <div className="space-y-3">
      {/* Skill Subsections */}
      {allCategories.map((category) => (
        <SkillSubsection
          key={category.id}
          categoryId={category.id}
          label={category.label}
          isOpen={openCategory === category.id}
          onToggle={() =>
            setOpenCategory(openCategory === category.id ? null : category.id)
          }
          skills={skills[category.id] || []}
          onAddSkill={(skill) => addSkill(category.id, skill)}
          onRemoveSkill={(index) => removeSkill(category.id, index)}
        />
      ))}

      {/* Add Custom Category Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full rounded-lg border border-slate-700 bg-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-100 transition-all duration-200 hover:bg-slate-600 active:bg-slate-500"
      >
        + Add Custom Skill Category
      </button>

      {/* Modal */}
      {showModal && (
        <AddCategoryModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddCustomCategory}
        />
      )}
    </div>
  )

  const values = getSkillsData()

  return {ui, values }
}

function SkillSubsection({
  label,
  isOpen,
  onToggle,
  skills,
  onAddSkill,
  onRemoveSkill,
}) {
  const [inputValue, setInputValue] = useState('')

  const handleAddSkill = () => {
    onAddSkill(inputValue)
    setInputValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill()
    }
  }

  const inputClass =
    'flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 focus:border-blue-500 focus:outline-none'

  return (
    <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
      {/* Header */}
      <div
        onClick={onToggle}
        className="flex h-12 w-full cursor-pointer items-center gap-3 border-b border-slate-700 bg-slate-800 px-4 transition-all duration-200 hover:bg-slate-700"
      >
        <span className="text-base font-semibold text-slate-100">{label}</span>
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

      {/* Body */}
      {isOpen && (
        <div className="space-y-3 border-t border-slate-700 px-4 py-4">
          {/* Skills Tags */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex h-7 items-center gap-1.5 rounded-full bg-blue-900 px-3 py-1 text-xs font-medium text-blue-300"
                >
                  {skill}
                  <button
                    onClick={() => onRemoveSkill(index)}
                    className="ml-0.5 cursor-pointer opacity-70 transition-opacity duration-150 hover:opacity-100"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input & Add Button */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={`Add ${label.toLowerCase()}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className={inputClass}
            />
            <button
              onClick={handleAddSkill}
              className="rounded-lg bg-slate-700 px-4 py-2.5 text-white transition-all duration-150 hover:bg-slate-600 active:bg-slate-500"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function AddCategoryModal({ onClose, onSubmit }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    onSubmit(inputValue)
    setInputValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-lg">
        {/* Header */}
        <h2 className="mb-4 text-lg font-semibold text-slate-100">
          Add Custom Skill Category
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="e.g., Soft Skills, Databases, Languages"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
          className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-700 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 focus:border-blue-500 focus:outline-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-all duration-200 hover:bg-slate-600 active:bg-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
            className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const labelClass =
    'mb-2 block text-xs font-medium tracking-wide text-slate-400 uppercase'
  const inputClass =
    'w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 focus:border-blue-500 focus:outline-none'
    
  return (
    <div className="space-y-4 border-t border-slate-700 px-4 py-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputField
            id="company"
            label="Company Name"
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </div>
        <div>
          <InputField
            id="position"
            label="Position"
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </div>
        <div>
          <InputField id= "date" label= "start date" type='date' inputClass={inputClass} labelClass={labelClass}/>
        </div>
        <div>
          <InputField id= "date" label= "end date" type='date' inputClass={inputClass} labelClass={labelClass}/>
        </div>
      </div>
      <div className='flex cursor-pointer items-center gap-2'>
        <input type="checkbox" className="h-5 w-5 cursor-pointer rounded-sm border-2 border-slate-700 bg-blue-500"/>
        <label className='cursor-pointer text-sm text-slate-100'>
          Currently Work Here
        </label>
        
      </div>
      
    </div>
  )
}
