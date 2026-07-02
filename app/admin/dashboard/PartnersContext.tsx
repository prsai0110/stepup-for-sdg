'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Partner = {
  img: string
  name: string
  sector: string
  focus: string
  location: string
  email: string
  phone: string
  website: string
  verified: boolean
  visible: boolean
  sdgs: string[]
  type: string
  desc: string
}

const initialPartners: Partner[] = [
  {
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=80&q=80',
    name: 'Oakridge Science High School', sector: 'SCHOOL', focus: 'Quality Education',
    location: 'California, USA', email: 'info@oakridge.edu', phone: '+1 555 0101',
    website: 'https://oakridge.edu', verified: true, visible: true,
    sdgs: ['SDG 3', 'SDG 4', 'SDG 13'], type: 'school',
    desc: 'A premier public science high school dedicated to equipping tomorrow\'s leaders with practical sustainability, engineering literacy, and global civic consciousness.'
  },
  {
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=80&q=80',
    name: 'Green Horizon Alliance', sector: 'NGO', focus: 'Climate Action',
    location: 'Nairobi, Kenya', email: 'hello@greenhorizon.org', phone: '+254 712 000',
    website: 'https://greenhorizon.org', verified: true, visible: true,
    sdgs: ['SDG 6', 'SDG 7', 'SDG 13', 'SDG 15'], type: 'ngo',
    desc: 'Global NGO advancing ecological conservation, clean electricity scaling, and biodiversity stewardship through community-driven youth action leagues.'
  },
  {
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=80&q=80',
    name: 'Solaris Global Renewables', sector: 'COMPANY', focus: 'Affordable Energy',
    location: 'San Francisco, CA', email: 'contact@solaris.com', phone: '+1 415 222',
    website: 'https://solaris.com', verified: true, visible: true,
    sdgs: ['SDG 7', 'SDG 13'], type: 'company',
    desc: 'Leading renewable energy enterprise developing smart solar infrastructure and offering technology grants, internships, and educational supplies to partner schools.'
  },
  {
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80',
    name: 'Youth Empowerment Initiative', sector: 'NGO', focus: 'Gender Equality',
    location: 'Mumbai, India', email: 'team@yei.org', phone: '+91 22 3456',
    website: 'https://yei.org', verified: false, visible: true,
    sdgs: ['SDG 4', 'SDG 5'], type: 'ngo',
    desc: 'Grassroots organization providing career mentorship, leadership incubators, and civic advocacy seminars for underprivileged teenage girls.'
  },
  {
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&q=80',
    name: 'Blue Marine Institute', sector: 'NGO', focus: 'Life Below Water',
    location: 'London, UK', email: 'hello@bluemarine.org', phone: '+44 20 7946',
    website: 'https://bluemarine.org', verified: true, visible: true,
    sdgs: ['SDG 14'], type: 'ngo',
    desc: 'Global NGO advancing ocean conservation, marine biodiversity research, and coastal community education programs across 40+ countries.'
  },
  {
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&q=80',
    name: 'Green Canopy Foundation', sector: 'NGO', focus: 'Life on Land',
    location: 'São Paulo, Brazil', email: 'hi@greencanopy.org', phone: '+55 11 2233',
    website: 'https://greencanopy.org', verified: true, visible: true,
    sdgs: ['SDG 15', 'SDG 13'], type: 'ngo',
    desc: 'Conservation foundation focused on reforestation, biodiversity protection, and indigenous land rights advocacy across the Amazon basin.'
  },
]

type PartnersContextType = {
  partners: Partner[]
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>
}

const PartnersContext = createContext<PartnersContextType>({
  partners: initialPartners,
  setPartners: () => {},
})

export function PartnersProvider({ children }: { children: ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners)

  return (
    <PartnersContext.Provider value={{ partners, setPartners }}>
      {children}
    </PartnersContext.Provider>
  )
}

export const usePartners = () => useContext(PartnersContext)
