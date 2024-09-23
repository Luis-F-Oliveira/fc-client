'use client'

import React from "react"

import type { IData } from "@/types/data"
import type { KeyedMutator } from "swr"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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

import { MailPlus, MailQuestion, RefreshCcw } from "lucide-react"
import axios from "@/lib/axios"
import { DateSend } from "./date-send"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  mutate: KeyedMutator<IData[]>
}

export function DataTable<TData extends IData, TValue>({
  columns,
  data,
  mutate
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [selectedOption, setSelectedOption] = React.useState('servant_name')
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowSelectionId, setRowSelectionId] = React.useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])

  const handleRefresh = () => mutate()

  const handleSendEmail = () => {
    setIsSubmitting(true)
    axios.post('/api/send_emails_by_ids', rowSelectionId)
      .then(() => setIsSubmitting(false))
      .catch(() => setIsSubmitting(false))
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
      rowSelection,
    }
  })

  React.useEffect(() => {
    let id: number[] = []
    table.getFilteredSelectedRowModel().rows.forEach((items) => {
      id.push(items.original.id)
    })
    setRowSelectionId(id)
  }, [rowSelection])

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
              <SelectItem value="order">Portaria</SelectItem>
              <SelectItem value="servant_name">Nome</SelectItem>
              <SelectItem value="servant_email">E-mail</SelectItem>
              <SelectItem value="created_at">Data</SelectItem>
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
        <div className="flex items-center gap-1">
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type='button'
                  size='icon'
                  variant='outline'
                  isSubmitting={isSubmitting}
                  onClick={handleSendEmail}
                >
                  <MailQuestion />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enviar Email Selecionados</p>
              </TooltipContent>
            </Tooltip>
            <DateSend />
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
      <div className="flex items-center">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
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
    </div>
  )
}