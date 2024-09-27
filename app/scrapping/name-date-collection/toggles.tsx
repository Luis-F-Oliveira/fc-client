'use client'

import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { HardDriveDownload, Play } from 'lucide-react'
import { useScrapping } from '@/context/scrapping'
import api from '@/lib/axios'
import anext from '@/lib/anext'
import { useToast } from '@/hooks/use-toast'
import { FormDialog } from './form'

export const Toggles = () => {
  const [isActive, setIsActive] = React.useState(false)
  const { active, setterData, storeData, isSubmitting } = useScrapping()
  const { toast } = useToast()

  const handleInit = async () => {
    setIsActive(true)

    try {
      const response = await api.get('/api/servants')
      const { data } = response

      setIsActive(false)
      active()

      try {
        const response = await anext.post('/api/current-day-collection', data)
        setterData(response.data.data)
      } catch (err: any) {
        throw new Error(err)
      }
    } catch (err: any) {
      const { message } = err.response.data
      toast({
        title: 'Houve um erro no pedido',
        description: message
      })
      setIsActive(false)
      throw new Error(err)
    }
  }

  return (
    <TooltipProvider>
      <FormDialog />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            type='button'
            isSubmitting={isSubmitting}
            onClick={storeData}
          >
            <HardDriveDownload />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Salvar Dados</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}
