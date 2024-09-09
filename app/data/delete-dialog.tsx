'use client'

import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/axios'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: number
}

export const DeleteDialog: React.FC<Props> = ({ isOpen, setIsOpen, id }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsSubmitting(true)

    await api.delete(`/api/servants/${id}`)
      .then((res) => {
        const { message } = res.data
        setIsSubmitting(false)

        toast({
          title: 'Successo',
          description: message
        })
      })
      .catch((err) => {
        const { message } = err.response.data
        setIsSubmitting(false)

        toast({
          title: 'Erro ao remover',
          description: message,
          variant: 'destructive'
        })
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente essa conta
            e remova seus dados de nossos servidores.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              size='sm'
              variant='destructive'
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            size='sm'
            onClick={handleDelete}
            isSubmitting={isSubmitting}
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
