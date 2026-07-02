'use client'

import { createContext, useContext } from 'react'

export const ThemeContext = createContext({ dark: false })
export const useDashboardTheme = () => useContext(ThemeContext)
