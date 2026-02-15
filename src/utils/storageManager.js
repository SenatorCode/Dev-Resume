const STORAGE_KEY = 'devresume_data'
const THEME_KEY = 'devresume_theme'

const isLocalStorageAvailable = () => {
  try {
    const test = '__test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

export const saveData = (data) => {
  if (!isLocalStorageAvailable()) {
    console.warn('LocalStorage is not available')
    return false
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (e) {
    console.error('Error saving to localStorage:', e)
    return false
  }
}

export const loadData = (defaultData) => {
  if (!isLocalStorageAvailable()) {
    return defaultData
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : defaultData
  } catch (e) {
    console.error('Error loading from localStorage:', e)
    return defaultData
  }
}

export const clearData = () => {
  if (!isLocalStorageAvailable()) {
    return false
  }
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    console.error('Error clearing localStorage:', e)
    return false
  }
}

export const saveTheme = (theme) => {
  if (!isLocalStorageAvailable()) {
    return false
  }
  try {
    localStorage.setItem(THEME_KEY, theme)
    return true
  } catch (e) {
    console.error('Error saving theme:', e)
    return false
  }
}

export const loadTheme = () => {
  if (!isLocalStorageAvailable()) {
    return getSystemTheme()
  }
  try {
    const theme = localStorage.getItem(THEME_KEY)
    if (theme) return theme
    return getSystemTheme()
  } catch (e) {
    console.error('Error loading theme:', e)
    return getSystemTheme()
  }
}

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
