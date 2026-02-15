import { Github, Linkedin, Twitter, Code } from 'lucide-react'

export default function Footer({ isDark }) {
  const links = [
    {
      icon: Github,
      url: 'https://github.com/senatorCode',
      label: 'GitHub Profile',
      title: 'My GitHub',
    },
    {
      icon: Code,
      url: 'https://github.com/senatorCode/Dev-Resume',
      label: 'Repository',
      title: 'Project Repository',
    },
    {
      icon: Linkedin,
      url: 'https://linkedin.com/in/senatorCode',
      label: 'LinkedIn',
      title: 'My LinkedIn',
    },
    {
      icon: Twitter,
      url: 'https://x.com/senatorCode',
      label: 'X',
      title: 'My X Profile',
    },
  ]

  return (
    <footer
      className="border-t px-6 py-4"
      style={{
        borderColor: isDark ? '#334155' : '#E2E8F0',
        backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
      }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-8">
          {links.map((link, idx) => {
            const Icon = link.icon
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:scale-110"
                style={{
                  color: isDark ? '#94A3B8' : '#475569',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = isDark ? '#3B82F6' : '#2563EB'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = isDark ? '#94A3B8' : '#475569'
                }}
                title={link.title}
              >
                <Icon size={24} />
              </a>
            )
          })}
        </div>
        <p
          className="text-xs font-medium"
          style={{
            color: isDark ? '#64748B' : '#94A3B8',
          }}
        >
          Built with React & Vite | © 2026 Dev Resume
        </p>
      </div>
    </footer>
  )
}
