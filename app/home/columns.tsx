"use client"

import type { IData } from '@/types/data'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<IData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "order",
    header: "Portaria"
  },
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
    header: "Data"
  }
]