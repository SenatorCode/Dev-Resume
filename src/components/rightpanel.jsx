import { useState } from 'react'
import { ZoomIn, ZoomOut, Printer } from 'lucide-react'

export default function RightPanel({ resumeData, isDark }) {
  const [zoom, setZoom] = useState(100)

  const handleZoom = (direction) => {
    const newZoom = direction === 'in' ? zoom + 10 : zoom - 10
    if (newZoom >= 50 && newZoom <= 200) {
      setZoom(newZoom)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      className="flex h-screen flex-col overflow-hidden border-l"
      style={{
        borderColor: isDark ? '#334155' : '#E2E8F0',
        backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
      }}
    >
      <div
        className="flex items-center justify-between border-b px-6 py-4"
        style={{
          borderColor: isDark ? '#334155' : '#E2E8F0',
        }}
      >
        <h2
          className="text-lg font-semibold"
          style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}
        >
          Live Preview
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom('out')}
            className="rounded-lg border p-2 transition-all hover:opacity-80"
            style={{
              borderColor: isDark ? '#334155' : '#E2E8F0',
              backgroundColor: isDark ? '#1e293b' : '#F1F5F9',
              color: isDark ? '#94A3B8' : '#475569',
            }}
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <span
            className="min-w-12 text-center text-sm font-medium"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            {zoom}%
          </span>
          <button
            onClick={() => handleZoom('in')}
            className="rounded-lg border p-2 transition-all hover:opacity-80"
            style={{
              borderColor: isDark ? '#334155' : '#E2E8F0',
              backgroundColor: isDark ? '#1e293b' : '#F1F5F9',
              color: isDark ? '#94A3B8' : '#475569',
            }}
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <div
            className="h-6 w-px"
            style={{ backgroundColor: isDark ? '#334155' : '#E2E8F0' }}
          ></div>
          <button
            onClick={handlePrint}
            className="rounded-lg border p-2 transition-all hover:opacity-80"
            style={{
              borderColor: isDark ? '#334155' : '#E2E8F0',
              backgroundColor: isDark ? '#1e293b' : '#F1F5F9',
              color: isDark ? '#94A3B8' : '#475569',
            }}
            title="Print"
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto p-4"
        style={{
          backgroundColor: isDark ? '#020617' : '#F8F9FA',
        }}
      >
        <div
          className="mx-auto shadow-xl"
          style={{
            width: `${8.5 * (zoom / 100)}in`,
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            marginBottom: '40px',
          }}
        >
          <ResumePreview resumeData={resumeData} isDark={isDark} />
        </div>
      </div>
    </div>
  )
}

function ResumePreview({ resumeData, isDark }) {
  const profile = resumeData?.personalProfile || {}
  const links = resumeData?.links || {}
  const skills = resumeData?.skills || {}
  const experiences = resumeData?.experience || []
  const educations = resumeData?.education || []

  const hasContent =
    Object.values(profile).some((v) => v) ||
    Object.values(links).some((v) => v) ||
    Object.values(skills).some((v) => v) ||
    experiences.length > 0 ||
    educations.length > 0

  const dummyData = {
    profile: {
      fullName: 'Alex Rivera',
      jobTitle: 'Full Stack Developer',
      email: 'alex.rivera@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary:
        'Experienced full-stack developer with 5+ years building scalable web applications using modern technologies. Passionate about clean code and user experience.',
    },
    links: {
      linkedin: 'https://linkedin.com/in/alexrivera',
      github: 'https://github.com/alexrivera',
      website: 'https://alexrivera.dev',
    },
    experiences: [
      {
        id: 1,
        position: 'Senior Developer',
        company: 'Tech Company Inc.',
        startDate: '2022-01-01',
        endDate: '2024-12-31',
        responsibilities: [
          'Led frontend architecture redesign',
          'Mentored junior developers',
          'Improved app performance by 40%',
        ],
      },
      {
        id: 2,
        position: 'Full Stack Developer',
        company: 'StartUp LLC',
        startDate: '2020-06-01',
        endDate: '2021-12-31',
        responsibilities: [
          'Built customer dashboard',
          'Implemented real-time notifications',
          'Maintained CI/CD pipeline',
        ],
      },
    ],
    educations: [
      {
        id: 1,
        degree: 'B.S. Computer Science',
        institution: 'University of California',
        startDate: '2016-09-01',
        endDate: '2020-05-31',
      },
    ],
    skills: {
      languages: {
        label: 'Languages',
        skills: ['JavaScript', 'Python', 'TypeScript', 'HTML/CSS', 'SQL'],
      },
      frameworks: {
        label: 'Frameworks',
        skills: ['React', 'Node.js', 'Express', 'Django', 'Next.js'],
      },
      tools: {
        label: 'Tools',
        skills: ['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'VS Code'],
      },
    },
  }

  const displayProfile = hasContent ? profile : dummyData.profile
  const displayLinks = hasContent ? links : dummyData.links
  const displaySkills = hasContent ? skills : dummyData.skills
  const displayExperiences = hasContent ? experiences : dummyData.experiences
  const displayEducations = hasContent ? educations : dummyData.educations

  return (
    <div data-resume-preview className="flex h-full flex-col bg-white">
      <div className="border-b-2 border-gray-900 px-10 py-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {displayProfile.fullName || 'Your Name'}
        </h1>
        <p className="mt-1 text-sm font-semibold tracking-wide text-blue-600 uppercase">
          {displayProfile.jobTitle || 'Job Title'}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-6 text-xs text-gray-700">
          {displayProfile.location && (
            <span className="flex items-center gap-1">
              📍 {displayProfile.location}
            </span>
          )}
          {displayProfile.email && (
            <span className="flex items-center gap-1">
              ✉️{' '}
              <a
                href={`mailto:${displayProfile.email}`}
                className="text-blue-600 hover:underline"
              >
                {displayProfile.email}
              </a>
            </span>
          )}
          {displayProfile.phone && <span>📱 {displayProfile.phone}</span>}
        </div>

        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          {displayLinks.linkedin && (
            <a
              href={displayLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {displayLinks.github && (
            <a
              href={displayLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}
          {displayLinks.website && (
            <a
              href={displayLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          )}
          {displayLinks.twitter && (
            <a
              href={displayLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              X
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1.5fr] gap-6 px-10 py-8 text-sm">
        {/* Left Column - Sidebar */}
        <div className="space-y-6">
          {displayProfile.summary && (
            <div>
              <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">
                Summary
              </h2>
              <p className="line-clamp-4 text-xs text-gray-700">
                {displayProfile.summary}
              </p>
            </div>
          )}

          {Object.values(displaySkills).some(
            (cat) => cat.skills?.length > 0,
          ) && (
            <div>
              <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">
                Skills
              </h2>
              <div className="space-y-2">
                {Object.entries(displaySkills).map(([, category]) =>
                  category.skills?.length > 0 ? (
                    <div key={category.label}>
                      <p className="text-xs font-semibold text-gray-800">
                        {category.label}
                      </p>
                      <p className="text-xs text-gray-600">
                        {category.skills.join(', ')}
                      </p>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="space-y-4">
          {experiences.length > 0 && (
            <div>
              <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">
                Experience
              </h2>
              <div className="space-y-2">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {exp.position || 'Position'}
                        </p>
                        <p className="text-xs text-gray-600">
                          {exp.company || 'Company'}
                        </p>
                      </div>
                      <p className="text-xs whitespace-nowrap text-gray-600">
                        {exp.startDate &&
                          new Date(exp.startDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        {exp.endDate &&
                          ` - ${new Date(exp.endDate).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              year: 'numeric',
                            },
                          )}`}
                        {exp.currentlyWorkHere && ' - Present'}
                      </p>
                    </div>
                    {exp.responsibilities.length > 0 && (
                      <ul className="mt-1 list-inside space-y-0.5 text-xs text-gray-700">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="list-disc">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div>
              <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">
                Education
              </h2>
              <div className="space-y-2">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {edu.degree || 'Degree'}
                        </p>
                        <p className="text-xs text-gray-600">
                          {edu.institution || 'Institution'}
                        </p>
                      </div>
                      <p className="text-xs whitespace-nowrap text-gray-600">
                        {edu.startDate &&
                          new Date(edu.startDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        {edu.endDate &&
                          ` - ${new Date(edu.endDate).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              year: 'numeric',
                            },
                          )}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
