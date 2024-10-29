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
import { useData } from "@/context/data-context"

const ActionsCell: React.FC<CellContext<IServant, unknown>> = ({ row }) => {
  const { setIsOpen, setId } = useData()
  const servant = row.original

  const handleEdit = () => {
    setId(servant.id)
    setIsOpen(true)
  }

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
        </DropdownMenuContent>
      </DropdownMenu>
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
