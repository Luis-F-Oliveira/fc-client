'use client'

import React from 'react'

import axios from '@/lib/axios'

import { Button } from '@/components/ui/button'

import { HardDriveDownload } from 'lucide-react'
import { OneEightyRingWithBg } from 'react-svg-spinners'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const getBlob = async () => {
  const response = await axios.post('/api/servants/export', null, {
    responseType: 'blob'
  })

  const blob = new Blob(
    [response.data],
    {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  )

  return blob
}

const ExportDialog = () => {
  const [download, setDownload] = React.useState<HTMLAnchorElement>()
  const name = `ServidorExcel_${Math.random()}.xlsx`

  const handleDownload = async () => {
    const blob = await getBlob()

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = name
    window.URL.revokeObjectURL(url)
    setDownload(a)
  }

  const handleClick = () => {
    download?.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
        >
          <HardDriveDownload />
        </Button>
      </DialogTrigger>
      <DialogContent className='fill-current'>
        <DialogHeader>
          <DialogTitle>Exportar</DialogTitle>
        </DialogHeader>
        <div className='w-full flex justify-center py-4'>
          {download ? (
            <Button variant='link' onClick={handleClick}>
              {name}
            </Button>
          ) : (
            <OneEightyRingWithBg />
          )}
        </div>
        <DialogFooter>
          <Button
            type='button'
            size='sm'
            onClick={handleDownload}
          >
            Baixar
          </Button>
          <DialogClose>
            <Button
              type='button'
              size='sm'
              variant='destructive'
            >
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const Export = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ExportDialog />
      </TooltipTrigger>
      <TooltipContent>
        <p>Exportar</p>
      </TooltipContent>
    </Tooltip >
  )
}
