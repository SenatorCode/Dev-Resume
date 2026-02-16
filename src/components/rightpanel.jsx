import { useState } from 'react'
import { ZoomIn, ZoomOut, Printer, MapPin, Mail, Phone } from 'lucide-react'

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
      className="flex h-full min-h-0 flex-col overflow-hidden border-l"
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
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-4"
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

function ResumePreview({ resumeData }) {
  const profile = resumeData?.personalProfile || {}
  const links = resumeData?.links || {}
  const skills = resumeData?.skills || {}
  const experiences = resumeData?.experience || []
  const educations = resumeData?.education || []

  // Check if user has entered any meaningful content
  const hasContent =
    (profile.fullName?.trim() !== '' && profile.fullName) ||
    (profile.jobTitle?.trim() !== '' && profile.jobTitle) ||
    (profile.email?.trim() !== '' && profile.email) ||
    (profile.phone?.trim() !== '' && profile.phone) ||
    (profile.location?.trim() !== '' && profile.location) ||
    (profile.summary?.trim() !== '' && profile.summary) ||
    (links.linkedin?.trim() !== '' && links.linkedin) ||
    (links.github?.trim() !== '' && links.github) ||
    (links.website?.trim() !== '' && links.website) ||
    (links.twitter?.trim() !== '' && links.twitter) ||
    links.custom?.length > 0 ||
    Object.values(skills).some((cat) => cat?.skills?.length > 0) ||
    experiences.length > 0 ||
    educations.length > 0

  const dummyData = {
    profile: {
      fullName: "Developer's Name",
      jobTitle: 'Full Stack Developer',
      email: 'someDeveloper@email.com',
      phone: '+123 (111) 123-4567',
      location: 'San Francisco, CA',
      summary:
        'Experienced full-stack developer with 5+ years building scalable web applications using modern technologies. Passionate about clean code and user experience. Skilled at collaborating across teams to deliver high-quality products, mentor junior engineers, and continuously improve delivery processes. Open-source contributor and speaker at local meetups.',
    },
    links: {
      linkedin: 'https://linkedin.com/in/yourprofile',
      github: 'https://github.com/yourusername',
      website: 'https://yourportfolio.com',
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
  const displayProjects = hasContent
    ? resumeData?.projects || []
    : dummyData.projects

  return (
    <div data-resume-preview className="flex h-full flex-col bg-white">
      <div className="border-b-2 border-gray-900 px-10 py-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {displayProfile.fullName || 'Your Name'}
        </h1>
        <p className="mt-1 text-sm font-semibold tracking-wide text-blue-600 uppercase">
          {displayProfile.jobTitle || 'Job Title'}
        </p>

        <div className="contact-info mt-3 flex flex-wrap gap-x-6 text-xs text-gray-700">
          {displayProfile.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} className="flex-shrink-0" />
              {displayProfile.location}
            </span>
          )}
          {displayProfile.email && (
            <span className="flex items-center gap-1">
              <Mail size={14} className="flex-shrink-0" />
              <a
                href={`mailto:${displayProfile.email}`}
                className="text-blue-600 hover:underline"
              >
                {displayProfile.email}
              </a>
            </span>
          )}
          {displayProfile.phone && (
            <span className="flex items-center gap-1">
              <Phone size={14} className="flex-shrink-0" />
              {displayProfile.phone}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-1 text-xs">
          {displayLinks.linkedin && (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-700">LinkedIn:</span>
              <a
                href={displayLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline"
              >
                {displayLinks.linkedin}
              </a>
            </div>
          )}
          {displayLinks.github && (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-700">GitHub:</span>
              <a
                href={displayLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline"
              >
                {displayLinks.github}
              </a>
            </div>
          )}
          {displayLinks.website && (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-700">Portfolio:</span>
              <a
                href={displayLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline"
              >
                {displayLinks.website}
              </a>
            </div>
          )}
          {displayLinks.twitter && (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-700">X/Twitter:</span>
              <a
                href={displayLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline"
              >
                {displayLinks.twitter}
              </a>
            </div>
          )}
          {displayLinks.custom && displayLinks.custom.length > 0 && (
            <div className="mt-2 space-y-1">
              {displayLinks.custom.map((link) => (
                <div key={link.id} className="flex items-center gap-1">
                  <span className="font-semibold text-gray-700">
                    {link.label}:
                  </span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-blue-600 hover:underline"
                  >
                    {link.url}
                  </a>
                </div>
              ))}
            </div>
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
              <p className="text-xs text-gray-700">{displayProfile.summary}</p>
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
          {displayExperiences.length > 0 && (
            <div>
              <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">
                Experience
              </h2>
              <div className="space-y-2">
                {displayExperiences.map((exp) => (
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

          {displayEducations.length > 0 && (
            <div>
              <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">
                Education
              </h2>
              <div className="space-y-2">
                {displayEducations.map((edu) => (
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
          {displayProjects && displayProjects.length > 0 && (
            <div className="mt-4">
              <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">
                Projects
              </h2>
              <div className="space-y-2">
                {displayProjects.map((p) => (
                  <div key={p.id}>
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    {p.description && (
                      <p className="text-xs text-gray-600">{p.description}</p>
                    )}
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {p.url}
                      </a>
                    )}
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
