'use client'

import React from 'react'

interface ContextProps {

}

interface ProviderProps {
  children: React.ReactNode
}

const Context = React.createContext({} as ContextProps)

export function useFilter() {
  const context = React.useContext(Context)
  if (!context) throw new Error('useFilter must be used within a FilterProvider')
  return context
}

export const FilterProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <Context.Provider value={{}}>
      {children}
    </Context.Provider>
  )
}