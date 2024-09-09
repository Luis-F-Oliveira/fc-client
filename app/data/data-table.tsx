"use client"

import React from "react"

import type { IServant } from "@/types/data"
import type { KeyedMutator } from "swr"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { Export } from "./export"
import { Import } from "./import"
import { Create } from "./create"

import { RefreshCcw } from "lucide-react"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  mutate: KeyedMutator<IServant[]>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  mutate
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [selectedOption, setSelectedOption] = React.useState('name')

  const handleRefresh = () => {
    mutate()
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <div className="w-1/3 grid grid-cols-3 gap-1 items-center">
          <Select
            value={selectedOption}
            onValueChange={(value) => {
              setSelectedOption(value)
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="enrollment">Matricula</SelectItem>
              <SelectItem value="contract">Contrato</SelectItem>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="email">E-mail</SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="col-span-2"
            placeholder="Filtrar..."
            value={(table.getColumn(selectedOption)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(selectedOption)?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type='button'
                  size='icon'
                  variant='outline'
                  onClick={handleRefresh}
                >
                  <RefreshCcw />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Atualizar</p>
              </TooltipContent>
            </Tooltip>
            <Export />
            <Import />
            <Create />
          </TooltipProvider>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
