"use client"

import type { IServant } from "@/types/data"
import { CellContext, ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import React from "react"
import { EditDialog } from "./edit-dialog"
import { DeleteDialog } from "./delete-dialog"
import { useReactTable, getFilteredRowModel } from '@tanstack/react-table'

const ActionsCell: React.FC<CellContext<IServant, unknown>> = ({ row }) => {
  const [isEdit, setIsEdit] = React.useState(false)
  const [isDelete, setIsDelete] = React.useState(false)
  const servant = row.original

  const handleEdit = () => setIsEdit(true)
  const handleDelete = () => setIsDelete(true)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
            Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditDialog
        isOpen={isEdit}
        setIsOpen={setIsEdit}
        id={servant.id}
      />
      <DeleteDialog
        isOpen={isDelete}
        setIsOpen={setIsDelete}
        id={servant.id}
      />
    </>
  )
}

export const columns: ColumnDef<IServant>[] = [
  {
    id: "actions",
    cell: (context) => <ActionsCell {...context} />
  },
  {
    accessorKey: "enrollment",
    header: "Matrícula"
  },
  {
    accessorKey: "contract",
    header: "Contrato"
  },
  {
    accessorKey: "name",
    header: "Nome"
  },
  {
    accessorKey: "email",
    header: "E-mail"
  },
  {
    accessorKey: "active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Notificações
        </Button>
      )
    },
    cell: ({ row }) => {
      const servant = row.original
      return (
        <div>
          {servant.active ? (
            <Badge className="cursor-default">
              Ativado
            </Badge>
          ) : (
            <Badge className="cursor-default" variant='destructive'>
              Desativado
            </Badge>
          )}
        </div>
      )
    }
  }
]
