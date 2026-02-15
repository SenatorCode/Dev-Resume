export const themeColors = {
  dark: {
    input:
      'w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 focus:border-blue-500 focus:outline-none',
    label:
      'mb-2 block text-xs font-medium tracking-wide text-slate-400 uppercase',
    border: '#334155',
    bg: '#0F172A',
    bgLight: '#1e293b',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    error: '#EF4444',
    modalBg: '#1e293b',
    modalBorder: '#334155',
    buttonBg: '#334155',
    buttonHover: '#475569',
  },
  light: {
    input:
      'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all duration-150 focus:border-blue-500 focus:outline-none',
    label:
      'mb-2 block text-xs font-medium tracking-wide text-gray-600 uppercase',
    border: '#E2E8F0',
    bg: '#FFFFFF',
    bgLight: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#64748B',
    error: '#DC2626',
    modalBg: '#FFFFFF',
    modalBorder: '#E2E8F0',
    buttonBg: '#F1F5F9',
    buttonHover: '#E2E8F0',
  },
}

export const getTheme = (isDark) => themeColors[isDark ? 'dark' : 'light']

export const getInputClass = (isDark) => getTheme(isDark).input

export const getLabelClass = (isDark) => getTheme(isDark).label

export const getColors = (isDark) => {
  const theme = getTheme(isDark)
  return {
    border: theme.border,
    bg: theme.bg,
    bgLight: theme.bgLight,
    text: theme.text,
    textSecondary: theme.textSecondary,
    modalBg: theme.modalBg,
    modalBorder: theme.modalBorder,
    buttonBg: theme.buttonBg,
    buttonHover: theme.buttonHover,
  }
}
