'use client'

import React from "react"

interface ContextProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: number | undefined
  setId: React.Dispatch<React.SetStateAction<number | undefined>>
}

interface ProviderProps {
  children: React.ReactNode
}

const Context = React.createContext({} as ContextProps)

export function useData() {
  const context = React.useContext(Context)
  if (!context) throw new Error('useData must be used within a DataProvider')
  return context
}

export const DataProvider: React.FC<ProviderProps> = ({ children }) => {
  const [ isOpen, setIsOpen ] = React.useState(false)
  const [ id, setId ] = React.useState<number | undefined>(undefined)

  return (
    <Context.Provider value={{ isOpen, setIsOpen, id, setId }}>
      {children}
    </Context.Provider>
  )
}