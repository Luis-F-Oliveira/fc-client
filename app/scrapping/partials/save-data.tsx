'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { HardDriveDownload } from 'lucide-react'
import { useScrapping } from '@/context/scrapping'

export const SaveData = () => {
  const { storeData, isSubmitting } = useScrapping()

  const handleStoreData = () => storeData()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            type='button'
            isSubmitting={isSubmitting}
            onClick={handleStoreData}
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
