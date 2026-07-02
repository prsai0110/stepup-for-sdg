'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getPartnershipSubmissions, addPartnershipSubmission as storeAdd, type PartnershipSubmission } from '@/app/lib/adminStore'

export type { PartnershipSubmission }

type CtxType = {
  submissions: PartnershipSubmission[]
  addSubmission: (s: Omit<PartnershipSubmission, 'id' | 'submittedAt'>) => void
}

const PartnershipFormContext = createContext<CtxType>({
  submissions: [],
  addSubmission: () => {},
})

export function PartnershipFormProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState<PartnershipSubmission[]>([])

  useEffect(() => {
    const load = () => setSubmissions(getPartnershipSubmissions())
    load()
    const interval = setInterval(load, 2000)
    return () => clearInterval(interval)
  }, [])

  const addSubmission = (s: Omit<PartnershipSubmission, 'id' | 'submittedAt'>) => {
    storeAdd(s)
    setSubmissions(getPartnershipSubmissions())
  }

  return (
    <PartnershipFormContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </PartnershipFormContext.Provider>
  )
}

export const usePartnershipForms = () => useContext(PartnershipFormContext)
