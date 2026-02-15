const defaultData = {
  profile: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  links: {
    linkedin: '',
    github: '',
    website: '',
    twitter: '',
    custom: [],
  },
  skills: {
    languages: [],
    frameworks: [],
    libraries: [],
    tools: [],
    infrastructure: [],
    other: [],
  },
  experience: [],
  education: [],
}

const experienceTemplate = {
  id: Date.now(),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  currentlyWorkHere: false,
  responsibilities: [],
}

const educationTemplate = {
  id: Date.now(),
  institution: '',
  degree: '',
  startDate: '',
  endDate: '',
}

const customLinkTemplate = {
  id: Date.now(),
  label: '',
  url: '',
}

export const getDefaultData = () => JSON.parse(JSON.stringify(defaultData))

export const getExperienceTemplate = () => ({
  ...experienceTemplate,
  id: Date.now(),
})

export const getEducationTemplate = () => ({
  ...educationTemplate,
  id: Date.now(),
})

export const getCustomLinkTemplate = () => ({
  ...customLinkTemplate,
  id: Date.now(),
})

export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return true
  return new Date(startDate) <= new Date(endDate)
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
