import { useState } from 'react'
import { ChevronDown, ChevronUp, Trash2, Edit2 } from 'lucide-react'
import {
  getExperienceTemplate,
  getEducationTemplate,
  validateDateRange,
} from '../utils/dataManager'
import { getInputClass, getLabelClass } from '../utils/themeUtils'

export function SectionSetUp({
  sectionName,
  sectionIcon,
  children,
  sectionOpen = false,
  isDark = true,
}) {
  const [isOpen, setIsOpen] = useState(sectionOpen)

  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{
        borderColor: isDark ? '#334155' : '#E2E8F0',
        backgroundColor: isDark ? '#1e293b' : '#F1F5F9',
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full cursor-pointer items-center gap-3 border-b px-4 transition-all duration-200 hover:opacity-80"
        style={{
          borderColor: isDark ? '#334155' : '#E2E8F0',
          backgroundColor: isDark ? '#1e293b' : '#F1F5F9',
        }}
      >
        <span className="h-6 w-6 text-blue-500">{sectionIcon}</span>
        <span
          className="text-base font-semibold"
          style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
        >
          {sectionName}
        </span>
        <div className="flex-1"></div>
        {isOpen ? (
          <ChevronUp
            size={18}
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          />
        ) : (
          <ChevronDown
            size={18}
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
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
  value,
  onChange,
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
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export function PersonalProfile({ isDark = true }) {
  const [profile, setProfile] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  })

  const inputClass = getInputClass(isDark)
  const labelClass = getLabelClass(isDark)

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const ui = (
    <div
      className="space-y-4 border-t px-4 py-6"
      style={{
        borderColor: isDark ? '#334155' : '#E2E8F0',
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputField
            id="fullName"
            label="Full Name"
            inputClass={inputClass}
            labelClass={labelClass}
            value={profile.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </div>
        <div>
          <InputField
            id="jobTitle"
            label="Job Title"
            inputClass={inputClass}
            labelClass={labelClass}
            value={profile.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
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
            value={profile.email}
            onChange={(e) => handleChange('email', e.target.value)}
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
            value={profile.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
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
          value={profile.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Professional Summary
        </label>
        <textarea
          id="summary"
          placeholder="Write a brief overview of your professional background..."
          className={`${inputClass} resize-vertical max-h-[300px] min-h-[100px]`}
          value={profile.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
      </div>
    </div>
  )

  return { ui, values: profile }
}

export function LinksSection({ isDark = true }) {
  const [links, setLinks] = useState({
    linkedin: '',
    github: '',
    website: '',
    twitter: '',
    custom: [],
  })
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false)
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false)
  const [editingCustom, setEditingCustom] = useState(null)
  const [modalLabel, setModalLabel] = useState('')
  const [modalUrl, setModalUrl] = useState('')

  const labelClass = getLabelClass(isDark)
  const inputClass = getInputClass(isDark)

  const handleStandardChange = (field, value) => {
    setLinks((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddCustomLink = () => {
    if (!modalLabel.trim() || !modalUrl.trim()) return

    if (editingCustom !== null) {
      setLinks((prev) => ({
        ...prev,
        custom: prev.custom.map((link) =>
          link.id === editingCustom.id
            ? { ...link, label: modalLabel, url: modalUrl }
            : link,
        ),
      }))
      setEditingCustom(null)
    } else {
      const newLink = { id: Date.now(), label: modalLabel, url: modalUrl }
      setLinks((prev) => ({
        ...prev,
        custom: [...prev.custom, newLink],
      }))
    }
    setModalLabel('')
    setModalUrl('')
    setIsLabelModalOpen(false)
    setIsUrlModalOpen(false)
  }

  const handleRemoveCustom = (id) => {
    setLinks((prev) => ({
      ...prev,
      custom: prev.custom.filter((link) => link.id !== id),
    }))
  }

  const handleEditCustom = (link) => {
    setEditingCustom(link)
    setModalLabel(link.label)
    setModalUrl(link.url)
    setIsLabelModalOpen(true)
  }

  const ui = (
    <div
      className="space-y-4 border-t px-4 py-6"
      style={{ borderColor: isDark ? '#334155' : '#E2E8F0' }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputField
            id="linkedin"
            label="LinkedIn"
            inputClass={inputClass}
            labelClass={labelClass}
            placeholder="https://www.linkedin.com/in/yourprofile"
            value={links.linkedin}
            onChange={(e) => handleStandardChange('linkedin', e.target.value)}
          />
        </div>
        <div>
          <InputField
            id="github"
            label="GitHub"
            inputClass={inputClass}
            labelClass={labelClass}
            placeholder="https://github.com/your-username"
            value={links.github}
            onChange={(e) => handleStandardChange('github', e.target.value)}
          />
        </div>
        <div>
          <InputField
            id="website"
            label="Portfolio Website"
            inputClass={inputClass}
            labelClass={labelClass}
            placeholder="https://myportfolio.com"
            value={links.website}
            onChange={(e) => handleStandardChange('website', e.target.value)}
          />
        </div>
        <div>
          <InputField
            id="twitter"
            label="X (Twitter)"
            inputClass={inputClass}
            labelClass={labelClass}
            placeholder="https://x.com/your-username"
            value={links.twitter}
            onChange={(e) => handleStandardChange('twitter', e.target.value)}
          />
        </div>
      </div>

      {links.custom.length > 0 && (
        <div className="space-y-2">
          <p className={labelClass}>Custom Links</p>
          {links.custom.map((link) => (
            <div
              key={link.id}
              className="rounded-lg border p-3"
              style={{
                borderColor: isDark ? '#334155' : '#E2E8F0',
                backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
                >
                  {link.label}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCustom(link)}
                    className="p-1"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleRemoveCustom(link.id)}
                    className="p-1"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p
                className="truncate text-xs"
                style={{ color: isDark ? '#94A3B8' : '#64748B' }}
              >
                {link.url}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-end gap-2 pt-4">
        <button
          onClick={() => {
            setEditingCustom(null)
            setModalLabel('')
            setModalUrl('')
            setIsLabelModalOpen(true)
          }}
          className="cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200"
          style={{
            border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
            backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
            color: isDark ? '#F1F5F9' : '#0F172A',
          }}
        >
          Add New Link
        </button>
      </div>

      {isLabelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className="w-full max-w-md rounded-lg p-6 shadow-lg"
            style={{
              border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
              backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
            }}
          >
            <h2
              className="mb-4 text-lg font-semibold"
              style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
            >
              {editingCustom ? 'Edit Link Name' : 'Add Link Name'}
            </h2>
            <input
              type="text"
              placeholder="e.g., Portfolio, Blog"
              value={modalLabel}
              onChange={(e) => setModalLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (modalLabel.trim()) {
                    setIsLabelModalOpen(false)
                    setIsUrlModalOpen(true)
                  }
                }
                if (e.key === 'Escape') setIsLabelModalOpen(false)
              }}
              autoFocus
              className={`${inputClass} mb-6`}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsLabelModalOpen(false)}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold"
                style={{
                  border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
                  backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
                  color: isDark ? '#F1F5F9' : '#0F172A',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (modalLabel.trim()) {
                    setIsLabelModalOpen(false)
                    setIsUrlModalOpen(true)
                  }
                }}
                disabled={!modalLabel.trim()}
                className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {isUrlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className="w-full max-w-md rounded-lg p-6 shadow-lg"
            style={{
              border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
              backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
            }}
          >
            <h2
              className="mb-4 text-lg font-semibold"
              style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
            >
              {editingCustom ? 'Edit Link URL' : 'Add Link URL'}
            </h2>
            <input
              type="url"
              placeholder="https://example.com"
              value={modalUrl}
              onChange={(e) => setModalUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && modalUrl.trim()) handleAddCustomLink()
                if (e.key === 'Escape') setIsUrlModalOpen(false)
              }}
              autoFocus
              className={`${inputClass} mb-6`}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsUrlModalOpen(false)}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold"
                style={{
                  border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
                  backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
                  color: isDark ? '#F1F5F9' : '#0F172A',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomLink}
                disabled={!modalUrl.trim()}
                className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {editingCustom ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return { ui, values: links }
}

export function SkillsSection({ isDark = true }) {
  const [customCategories, setCustomCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalInput, setModalInput] = useState('')
  const [skills, setSkills] = useState({
    languages: [],
    frameworks: [],
    libraries: [],
    tools: [],
    infrastructure: [],
    other: [],
  })

  const defaultCategories = [
    { id: 'languages', label: 'Languages' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'libraries', label: 'Libraries' },
    { id: 'tools', label: 'Tools' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'other', label: 'Other Skills' },
  ]

  const allCategories = [...defaultCategories, ...customCategories]

  const addSkill = (categoryId, skill) => {
    if (!skill.trim()) return
    setSkills((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), skill],
    }))
  }

  const removeSkill = (categoryId, index) => {
    setSkills((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].filter((_, i) => i !== index),
    }))
  }

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
    }
    setShowModal(false)
    setModalInput('')
  }

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
    <div
      className="space-y-3 border-t px-4 py-6"
      style={{ borderColor: isDark ? '#334155' : '#E2E8F0' }}
    >
      {allCategories.map((category) => (
        <SkillSubsection
          key={category.id}
          isDark={isDark}
          categoryId={category.id}
          label={category.label}
          skills={skills[category.id] || []}
          onAddSkill={(skill) => addSkill(category.id, skill)}
          onRemoveSkill={(index) => removeSkill(category.id, index)}
        />
      ))}

      <button
        onClick={() => setShowModal(true)}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200"
        style={{
          border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
          backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
          color: isDark ? '#F1F5F9' : '#0F172A',
        }}
      >
        + Add Custom Skill Category
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className="w-full max-w-md rounded-lg p-6 shadow-lg"
            style={{
              border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
              backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
            }}
          >
            <h2
              className="mb-4 text-lg font-semibold"
              style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
            >
              Add Skill Category
            </h2>
            <input
              type="text"
              placeholder="e.g., Soft Skills, Databases"
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddCustomCategory(e.target.value)
                }
                if (e.key === 'Escape') setShowModal(false)
              }}
              autoFocus
              className={`${getInputClass(isDark)} mb-6 w-full`}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold"
                style={{
                  border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
                  backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
                  color: isDark ? '#F1F5F9' : '#0F172A',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddCustomCategory(modalInput)}
                disabled={!modalInput.trim()}
                className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return { ui, values: getSkillsData() }
}

function SkillSubsection({
  label,
  categoryId,
  skills,
  onAddSkill,
  onRemoveSkill,
  isDark = true,
}) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleAddSkill = () => {
    onAddSkill(inputValue)
    setInputValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill()
    }
  }

  const inputClass = getInputClass(isDark).replace('w-full', 'flex-1')

  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{
        borderColor: isDark ? '#334155' : '#E2E8F0',
        backgroundColor: isDark ? '#1e293b' : '#F1F5F9',
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full cursor-pointer items-center gap-3 border-b px-4 transition-all duration-200 hover:opacity-80"
        style={{
          borderColor: isDark ? '#334155' : '#E2E8F0',
          backgroundColor: isDark ? '#1e293b' : '#F1F5F9',
        }}
      >
        <span
          className="text-base font-semibold"
          style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
        >
          {label}
        </span>
        <div className="flex-1"></div>
        {isOpen ? (
          <ChevronUp
            size={18}
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          />
        ) : (
          <ChevronDown
            size={18}
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          />
        )}
      </div>

      {isOpen && (
        <div
          className="space-y-3 border-t px-4 py-4"
          style={{
            borderColor: isDark ? '#334155' : '#E2E8F0',
          }}
        >
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
              className="rounded-lg px-4 py-2.5 text-white transition-all duration-150"
              style={{
                backgroundColor: isDark ? '#475569' : '#9CA3AF',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDark ? '#64748B' : '#D1D5DB'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = isDark ? '#475569' : '#9CA3AF'
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function ExperienceSection({ isDark = true }) {
  const [experiences, setExperiences] = useState([])
  const [editingId, setEditingId] = useState(null)

  const labelClass = getLabelClass(isDark)
  const inputClass = getInputClass(isDark)

  const handleAddExperience = () => {
    const newExp = getExperienceTemplate()
    setExperiences((prev) => [...prev, newExp])
    setEditingId(newExp.id)
  }

  const handleUpdateExperience = (id, field, value) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    )
  }

  const handleDeleteExperience = (id) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const handleAddResponsibility = (id, responsibility) => {
    if (!responsibility.trim()) return
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              responsibilities: [...exp.responsibilities, responsibility],
            }
          : exp,
      ),
    )
  }

  const handleRemoveResponsibility = (id, index) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              responsibilities: exp.responsibilities.filter(
                (_, i) => i !== index,
              ),
            }
          : exp,
      ),
    )
  }

  const ui = (
    <div
      className="space-y-4 border-t px-4 py-6"
      style={{ borderColor: isDark ? '#334155' : '#E2E8F0' }}
    >
      {experiences.map((exp) => (
        <ExperienceEntry
          key={exp.id}
          experience={exp}
          isEditing={editingId === exp.id}
          onEdit={() => setEditingId(exp.id)}
          onDelete={() => handleDeleteExperience(exp.id)}
          onClose={() => setEditingId(null)}
          onUpdate={(field, value) =>
            handleUpdateExperience(exp.id, field, value)
          }
          onAddResponsibility={(resp) => handleAddResponsibility(exp.id, resp)}
          onRemoveResponsibility={(index) =>
            handleRemoveResponsibility(exp.id, index)
          }
          labelClass={labelClass}
          inputClass={inputClass}
        />
      ))}

      <button
        onClick={handleAddExperience}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200"
        style={{
          border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
          backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
          color: isDark ? '#F1F5F9' : '#0F172A',
        }}
      >
        + Add New Experience
      </button>
    </div>
  )

  return { ui, values: experiences }
}

function ExperienceEntry({
  experience,
  isEditing,
  onEdit,
  onDelete,
  onClose,
  onUpdate,
  onAddResponsibility,
  onRemoveResponsibility,
  labelClass,
  inputClass,
}) {
  const [inputValue, setInputValue] = useState('')

  const addResp = () => {
    if (inputValue.trim()) {
      onAddResponsibility(inputValue)
      setInputValue('')
    }
  }

  const dateError =
    experience.startDate &&
    experience.endDate &&
    !validateDateRange(experience.startDate, experience.endDate)

  return (
    <div
      className="rounded-lg border p-4"
      style={{
        borderColor: isDark ? '#334155' : '#E2E8F0',
        backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1">
          <p
            className="text-sm font-semibold"
            style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
          >
            {experience.company || 'Untitled'} ·{' '}
            {experience.position || 'Position'}
          </p>
          {!isEditing && (
            <p
              className="text-xs"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              {experience.startDate &&
                new Date(experience.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              {experience.endDate &&
                ` - ${new Date(experience.endDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}`}
            </p>
          )}
        </div>
        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-1"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-1"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Company</label>
              <input
                type="text"
                placeholder="Company Name"
                className={inputClass}
                value={experience.company}
                onChange={(e) => onUpdate('company', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Position</label>
              <input
                type="text"
                placeholder="Position Title"
                className={inputClass}
                value={experience.position}
                onChange={(e) => onUpdate('position', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="date"
                className={`${inputClass} ${dateError ? 'border-red-500' : ''}`}
                value={experience.startDate}
                onChange={(e) => onUpdate('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>
                End Date
                {experience.currentlyWorkHere && (
                  <span className="ml-2 text-xs text-blue-400">(Current)</span>
                )}
              </label>
              <input
                type="date"
                disabled={experience.currentlyWorkHere}
                className={`${inputClass} ${dateError ? 'border-red-500' : ''} ${experience.currentlyWorkHere ? 'opacity-50' : ''}`}
                value={experience.endDate}
                onChange={(e) => onUpdate('endDate', e.target.value)}
              />
            </div>
          </div>

          {dateError && (
            <p className="text-xs" style={{ color: '#FB7185' }}>
              Start date must be before end date
            </p>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${experience.id}`}
              checked={experience.currentlyWorkHere}
              onChange={(e) => onUpdate('currentlyWorkHere', e.target.checked)}
              className="h-5 w-5 cursor-pointer rounded-sm"
              style={{
                border: `2px solid ${isDark ? '#334155' : '#E2E8F0'}`,
                backgroundColor: experience.currentlyWorkHere
                  ? '#3B82F6'
                  : 'transparent',
              }}
            />
            <label
              htmlFor={`current-${experience.id}`}
              className="cursor-pointer text-sm"
              style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
            >
              Currently Work Here
            </label>
          </div>

          <div>
            <label className={labelClass}>Responsibilities</label>
            {experience.responsibilities.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {experience.responsibilities.map((resp, index) => (
                  <span
                    key={index}
                    className="inline-flex h-7 items-center gap-1.5 rounded-full bg-blue-900 px-3 py-1 text-xs font-medium text-blue-300"
                  >
                    {resp}
                    <button
                      onClick={() => onRemoveResponsibility(index)}
                      className="ml-0.5 cursor-pointer opacity-70 hover:opacity-100"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add responsibility..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addResp()
                }}
                className={inputClass}
              />
              <button
                onClick={addResp}
                className="rounded-lg px-4 py-2.5 text-white"
                style={{ backgroundColor: isDark ? '#334155' : '#9CA3AF' }}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm"
              style={{
                border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
                backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
                color: isDark ? '#F1F5F9' : '#0F172A',
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function EducationSection({ isDark = true }) {
  const [educations, setEducations] = useState([])
  const [editingId, setEditingId] = useState(null)

  const labelClass = getLabelClass(isDark)
  const inputClass = getInputClass(isDark)

  const handleAddEducation = () => {
    const newEdu = getEducationTemplate()
    setEducations((prev) => [...prev, newEdu])
    setEditingId(newEdu.id)
  }

  const handleUpdateEducation = (id, field, value) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    )
  }

  const handleDeleteEducation = (id) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const ui = (
    <div
      className="space-y-4 border-t px-4 py-6"
      style={{ borderColor: isDark ? '#334155' : '#E2E8F0' }}
    >
      {educations.map((edu) => (
        <EducationEntry
          key={edu.id}
          education={edu}
          isEditing={editingId === edu.id}
          onEdit={() => setEditingId(edu.id)}
          onDelete={() => handleDeleteEducation(edu.id)}
          onClose={() => setEditingId(null)}
          onUpdate={(field, value) =>
            handleUpdateEducation(edu.id, field, value)
          }
          labelClass={labelClass}
          inputClass={inputClass}
        />
      ))}

      <button
        onClick={handleAddEducation}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200"
        style={{
          border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
          backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
          color: isDark ? '#F1F5F9' : '#0F172A',
        }}
      >
        + Add Education
      </button>
    </div>
  )

  return { ui, values: educations }
}

function EducationEntry({
  education,
  isEditing,
  onEdit,
  onDelete,
  onClose,
  onUpdate,
  labelClass,
  inputClass,
}) {
  const dateError =
    education.startDate &&
    education.endDate &&
    !validateDateRange(education.startDate, education.endDate)

  return (
    <div
      className="rounded-lg border p-4"
      style={{
        borderColor: isDark ? '#334155' : '#E2E8F0',
        backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1">
          <p
            className="text-sm font-semibold"
            style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
          >
            {education.institution || 'Untitled'}
          </p>
          {!isEditing && (
            <>
              <p
                className="text-xs"
                style={{ color: isDark ? '#94A3B8' : '#64748B' }}
              >
                {education.degree}
              </p>
              <p
                className="text-xs"
                style={{ color: isDark ? '#94A3B8' : '#6B7280' }}
              >
                {education.startDate &&
                  new Date(education.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                {education.endDate &&
                  ` - ${new Date(education.endDate).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      year: 'numeric',
                    },
                  )}`}
              </p>
            </>
          )}
        </div>
        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-1"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-1"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Institution</label>
            <input
              type="text"
              placeholder="University/School Name"
              className={inputClass}
              value={education.institution}
              onChange={(e) => onUpdate('institution', e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Degree/Program</label>
            <input
              type="text"
              placeholder="e.g., Bachelor of Science in Computer Science"
              className={inputClass}
              value={education.degree}
              onChange={(e) => onUpdate('degree', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="date"
                className={`${inputClass} ${dateError ? 'border-red-500' : ''}`}
                value={education.startDate}
                onChange={(e) => onUpdate('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input
                type="date"
                className={`${inputClass} ${dateError ? 'border-red-500' : ''}`}
                value={education.endDate}
                onChange={(e) => onUpdate('endDate', e.target.value)}
              />
            </div>
          </div>

          {dateError && (
            <p className="text-xs" style={{ color: '#FB7185' }}>
              Start date must be before end date
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm"
              style={{
                border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
                backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
                color: isDark ? '#F1F5F9' : '#0F172A',
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
