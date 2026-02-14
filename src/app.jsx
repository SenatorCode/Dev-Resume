import { SectionSetUp, PersonalProfile, LinksSection, SkillsSection, ExperienceSection, EducationSection} from "./components/leftpanel";
import Header from "./components/header";
import { User, Link, Code, BriefcaseBusiness, GraduationCap} from 'lucide-react'

export default function App () {
    return (
        <>
        <Header />
        <div className="flex h-screen overflow-hidden p-16">
            <div className="w-3/5 overflow-y-auto border-r border-slate-700 bg-slate-900 p-6">
            <div className="mx-auto max-w-[600px] space-y-5">
                <SectionSetUp
                sectionName="Personal Profile"
                sectionIcon={<User />}
                sectionOpen={true}
                >
                <PersonalProfile />
                </SectionSetUp>
                <SectionSetUp
                sectionName="Links"
                sectionIcon={<Link />}
                >
                <LinksSection />
                </SectionSetUp>

                <SectionSetUp
                sectionName="Technical Skills"
                sectionIcon={<Code />}
                >
                    {SkillsSection().ui}
                </SectionSetUp>

                <SectionSetUp 
                sectionName="Educational Background"
                sectionIcon={<GraduationCap />}
                >
                    <EducationSection/>
                </SectionSetUp>
                <SectionSetUp
                sectionName="Experience"
                sectionIcon={<BriefcaseBusiness />}
                >
                {ExperienceSection().ui}
                </SectionSetUp>
            </div>
            </div>
        </div>
        </>
    );
}