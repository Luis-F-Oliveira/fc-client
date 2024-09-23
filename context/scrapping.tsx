'use client'

import React from "react"
import type { IData } from "@/types/data"
import { TypingEffect } from '@/components/ui/typing'
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import api from "@/lib/axios"
import { useToast } from "@/hooks/use-toast"

interface ContextProps {
  data: IData[]
  date: Date
  isSubmitting: boolean
  active: () => void
  setterData: (data: IData[]) => void
  storeData: () => void
}

interface ProviderProps {
  children: React.ReactNode
}

const Span = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-50">
      <div className="flex h-full justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>
              Aviso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TypingEffect
              speed={50}
              repeatDelay={5000}
              text=" Dados estão sendo coletados, por favor aguarde..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const Context = React.createContext({} as ContextProps)

export function useScrapping() {
  const context = React.useContext(Context)
  if (!context) throw new Error('useScrapping must be used within a ScrappingProvider')
  return context
}

export const ScrappingProvider: React.FC<ProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<IData[]>([])
  const [date, setDate] = React.useState(new Date())
  const [isActive, setIsActive] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { refresh } = useRouter()
  const { toast } = useToast()

  React.useEffect(() => {
    const savedData = localStorage.getItem('scrapping')
    if (savedData) setData(JSON.parse(savedData))
  }, [])

  React.useEffect(() => {
    const savedData = localStorage.getItem('scrapping_date')
    if (savedData) setDate(new Date(JSON.parse(savedData)))
  }, [])

  const active = () => {
    setIsActive(true)
  }

  const setterData = (data: IData[]) => {
    const date = new Date()
    setIsActive(false)
    setData(data)
    localStorage.setItem('scrapping', JSON.stringify(data))
    localStorage.setItem('scrapping_date', JSON.stringify(date))
    refresh()
  }

  const storeData = () => {
    setIsSubmitting(true)
    api.post('/api/collected_data', data)
      .then((res) => {
        const { message } = res.data
        setIsSubmitting(false)
        toast({
          title: "Dados Salvos",
          description: message
        })
      })
      .catch((err) => {
        const { message } = err.response.data
        setIsSubmitting(false)
        toast({
          title: "Erro ao Salvar Dados",
          description: message,
          variant: 'destructive'
        })
      })
  }

  return (
    <Context.Provider value={{ data, date, isSubmitting, active, setterData, storeData }}>
      {children}
      {isActive && <Span />}
    </Context.Provider>
  )
}