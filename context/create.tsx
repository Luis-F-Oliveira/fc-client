'use client'

import { IUser } from "@/@types/user"
import React from "react"

interface ContextProps {
  user: IUser | null
  setterUser: (data: IUser) => void
}

interface ProviderProps {
  children: React.ReactNode
}

const Context = React.createContext({} as ContextProps)

export function useCreate() {
  const context = React.useContext(Context)
  if (!context) throw new Error('useCreate must be used within a CreateProvider')
  return context
}

export const CreateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<IUser | null>(null)

  React.useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      try {
        setUser(JSON.parse(data))
      } catch (error) {
        console.error("Erro ao fazer parse dos dados do usuário:", error)
      }
    }
  }, [])

  const setterUser = (data: IUser) => {
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  return (
    <Context.Provider value={{ user, setterUser }}>
      {children}
    </Context.Provider>
  )
} 