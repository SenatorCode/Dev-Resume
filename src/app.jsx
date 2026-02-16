import { useState, useEffect } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import RightPanel from './components/rightpanel'
import {
  SectionSetUp,
  PersonalProfile,
  LinksSection,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
} from './components/leftpanel'
import {
  User,
  Link,
  Code,
  BriefcaseBusiness,
  GraduationCap,
  Braces,
} from 'lucide-react'
import {
  loadData,
  saveData,
  loadTheme,
  saveTheme,
} from './utils/storageManager'
import { getDefaultData } from './utils/dataManager'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const [profileData, setProfileData] = useState({})
  const [linksData, setLinksData] = useState({})
  const [skillsData, setSkillsData] = useState({})
  const [experienceData, setExperienceData] = useState([])
  const [educationData, setEducationData] = useState([])
  const [projectsData, setProjectsData] = useState([])

  useEffect(() => {
    const theme = loadTheme()
    setIsDark(theme === 'dark')

    const savedData = loadData(getDefaultData())
    if (savedData.personalProfile) setProfileData(savedData.personalProfile)
    if (savedData.links) setLinksData(savedData.links)
    if (savedData.skills) setSkillsData(savedData.skills)
    if (savedData.experience) setExperienceData(savedData.experience)
    if (savedData.education) setEducationData(savedData.education)
  }, [])

  useEffect(() => {
    const data = {
      personalProfile: profileData,
      links: linksData,
      skills: skillsData,
      experience: experienceData,
      education: educationData,
      projects: projectsData,
    }
    saveData(data)
  }, [
    profileData,
    linksData,
    skillsData,
    experienceData,
    educationData,
    projectsData,
  ])

  useEffect(() => {
    const savedData = loadData(getDefaultData())
    if (savedData.projects) setProjectsData(savedData.projects)
  }, [])

  useEffect(() => {
    // persist projects whenever they change
    const data = loadData(getDefaultData())
    data.projects = projectsData
    saveData(data)
  }, [projectsData])

  const handleThemeToggle = () => {
    const newTheme = !isDark ? 'dark' : 'light'
    setIsDark(!isDark)
    saveTheme(newTheme)
  }

  const resumeData = {
    personalProfile: profileData,
    links: linksData,
    skills: skillsData,
    experience: experienceData,
    education: educationData,
    projects: projectsData,
  }

  const personalProfileComponent = PersonalProfile({ isDark })
  const linksComponent = LinksSection({ isDark })
  const skillsComponent = SkillsSection({ isDark })
  const experienceComponent = ExperienceSection({ isDark })
  const educationComponent = EducationSection({ isDark })
  const projectsComponent = ProjectsSection({ isDark })
  // Consolidated effect: compare serialized values to avoid infinite update loops
  const _prev = (function () {
    // store on component so value persists across renders without adding deps
    if (!globalThis.__devResumePrev) globalThis.__devResumePrev = {}
    return globalThis.__devResumePrev
  })()

  useEffect(() => {
    try {
      const profileStr = JSON.stringify(personalProfileComponent.values || {})
      if (profileStr !== _prev.profile) {
        _prev.profile = profileStr
        if (Object.keys(personalProfileComponent.values || {}).length > 0) {
          setProfileData(personalProfileComponent.values)
        }
      }

      const linksStr = JSON.stringify(linksComponent.values || {})
      if (linksStr !== _prev.links) {
        _prev.links = linksStr
        if (Object.keys(linksComponent.values || {}).length > 0) {
          setLinksData(linksComponent.values)
        }
      }

      const skillsStr = JSON.stringify(skillsComponent.values || {})
      if (skillsStr !== _prev.skills) {
        _prev.skills = skillsStr
        if (Object.keys(skillsComponent.values || {}).length > 0) {
          setSkillsData(skillsComponent.values)
        }
      }

      const expStr = JSON.stringify(experienceComponent.values || [])
      if (expStr !== _prev.experience) {
        _prev.experience = expStr
        setExperienceData(experienceComponent.values || [])
      }

      const eduStr = JSON.stringify(educationComponent.values || [])
      if (eduStr !== _prev.education) {
        _prev.education = eduStr
        setEducationData(educationComponent.values || [])
      }

      const projStr = JSON.stringify(projectsComponent.values?.projects || [])
      if (projStr !== _prev.projects) {
        _prev.projects = projStr
        setProjectsData(projectsComponent.values?.projects || [])
      }
    } catch (err) {
      console.debug(err)
    }
  })

  return (
    <div className={`flex h-screen flex-col ${isDark ? 'dark' : 'light'}`}>
      <Header
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        onShowPreview={() => setShowMobilePreview(!showMobilePreview)}
      />

      <div className="flex flex-1 overflow-hidden pt-16">
        <div
          className={`w-full overflow-y-auto border-r p-4 md:p-6 ${
            showMobilePreview ? 'hidden' : 'block'
          } lg:block lg:w-1/2`}
          style={{
            borderColor: isDark ? '#334155' : '#E2E8F0',
            backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          }}
        >
          <div className="mx-auto max-w-[600px] space-y-4 md:space-y-5">
            <SectionSetUp
              sectionName="Personal Profile"
              sectionIcon={<User />}
              sectionOpen={true}
              isDark={isDark}
            >
              {personalProfileComponent.ui}
            </SectionSetUp>

            <SectionSetUp
              sectionName="Links"
              sectionIcon={<Link />}
              isDark={isDark}
            >
              {linksComponent.ui}
            </SectionSetUp>

            <SectionSetUp
              sectionName="Technical Skills"
              sectionIcon={<Code />}
              isDark={isDark}
            >
              {skillsComponent.ui}
            </SectionSetUp>

            <SectionSetUp
              sectionName="Projects"
              sectionIcon={<Braces />}
              isDark={isDark}
            >
              {projectsComponent.ui}
            </SectionSetUp>

            <SectionSetUp
              sectionName="Experience"
              sectionIcon={<BriefcaseBusiness />}
              isDark={isDark}
            >
              {experienceComponent.ui}
            </SectionSetUp>

            <SectionSetUp
              sectionName="Educational Background"
              sectionIcon={<GraduationCap />}
              isDark={isDark}
            >
              {educationComponent.ui}
            </SectionSetUp>
          </div>
        </div>

        <div
          className={`${
            showMobilePreview ? 'block' : 'hidden'
          } overflow-hidden lg:block lg:w-1/2`}
          style={{
            backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          }}
        >
          <RightPanel resumeData={resumeData} isDark={isDark} />
        </div>
      </div>

      <Footer isDark={isDark} />
    </div>
  )
}
