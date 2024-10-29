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

interface Props {
  token: string | undefined
}

export const SaveData: React.FC<Props> = ({ token }) => {
  const { storeData, isSubmitting } = useScrapping()

  const handleStoreData = () => storeData(token)

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
