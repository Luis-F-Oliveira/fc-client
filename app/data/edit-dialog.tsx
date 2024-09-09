'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Edit } from './edit'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: number
}

export const EditDialog: React.FC<Props> = ({ isOpen, setIsOpen, id }) => {
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
