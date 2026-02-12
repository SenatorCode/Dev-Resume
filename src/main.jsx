import React from 'react'
import ReactDOM from 'react-dom/client'
import { User } from 'lucide-react'
import Header from './components/header.jsx'
import { PersonalProfile, SectionSetUp } from './components/leftpanel.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="flex h-screen flex-col pt-16">
      <Header />
      <SectionSetUp
        sectionName="Personal Profile"
        sectionIcon={<User />}
        sectionOpen={true}
      >
        <PersonalProfile />
      </SectionSetUp>
    </div>
  </React.StrictMode>,
)
