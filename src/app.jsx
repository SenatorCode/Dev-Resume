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
} from './components/leftpanel'
import {
  User,
  Link,
  Code,
  BriefcaseBusiness,
  GraduationCap,
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
  const [profileData, setProfileData] = useState({})
  const [linksData, setLinksData] = useState({})
  const [skillsData, setSkillsData] = useState({})
  const [experienceData, setExperienceData] = useState([])
  const [educationData, setEducationData] = useState([])

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
    }
    saveData(data)
  }, [profileData, linksData, skillsData, experienceData, educationData])

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
  }

  const personalProfileComponent = PersonalProfile({ isDark })
  const linksComponent = LinksSection({ isDark })
  const skillsComponent = SkillsSection({ isDark })
  const experienceComponent = ExperienceSection({ isDark })
  const educationComponent = EducationSection({ isDark })

  useEffect(() => {
    if (Object.keys(personalProfileComponent.values).length > 0) {
      setProfileData(personalProfileComponent.values)
    }
  }, [personalProfileComponent.values])

  useEffect(() => {
    if (Object.keys(linksComponent.values).length > 0) {
      setLinksData(linksComponent.values)
    }
  }, [linksComponent.values])

  useEffect(() => {
    if (Object.keys(skillsComponent.values).length > 0) {
      setSkillsData(skillsComponent.values)
    }
  }, [skillsComponent.values])

  useEffect(() => {
    if (experienceComponent.values.length >= 0) {
      setExperienceData(experienceComponent.values)
    }
  }, [experienceComponent.values])

  useEffect(() => {
    if (educationComponent.values.length >= 0) {
      setEducationData(educationComponent.values)
    }
  }, [educationComponent.values])

  return (
    <div className={`flex h-screen flex-col ${isDark ? 'dark' : 'light'}`}>
      <Header isDark={isDark} onThemeToggle={handleThemeToggle} />

      <div className="flex flex-1 overflow-hidden pt-16">
        <div
          className="w-full overflow-y-auto border-r p-4 md:p-6 lg:w-1/2"
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
          className="hidden overflow-hidden lg:block lg:w-1/2"
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
