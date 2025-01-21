"use client"

import type { IReport } from '@/@types/data'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const columns: ColumnDef<IReport>[] = [
  {
    accessorKey: "servant.name",
    header: "Nome"
  },
  {
    accessorKey: "servant.email",
    header: "E-mail"
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data Envio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "data.created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data Portaria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "data.url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.original.data.url
      return (
        <Link href={url} target='_blank'>
          <Button
            variant='ghost'
            className="h-8 w-8 p-0"
          >
            <SquareArrowOutUpRight />
          </Button>
        </Link>
      )
    }
  }
]