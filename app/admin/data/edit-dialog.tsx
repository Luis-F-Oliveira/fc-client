"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Edit } from './edit'
import { useData } from '@/context/data-context'

export const EditDialog = () => {
  const { isOpen, setIsOpen, id } = useData()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar</DialogTitle>
        </DialogHeader>
        <Edit id={id} />
      </DialogContent>
    </Dialog>
  )
}
