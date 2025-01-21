"use server"

import api from '@/lib/axios'
import React from 'react'
import { columns } from './columns'
import { cookies } from 'next/headers'
import { DataProvider } from '@/context/data-context'
import { DataTable } from './data-table'
import { EditDialog } from './edit-dialog'

import type { IServant } from '@/@types/data'

async function getData(): Promise<IServant[]> {
  try {
    const res = await api.get('/api/servants')
    return res.data
  } catch (err: any) {
    const status = err.response?.status
    throw new Error(status)
  }
}

export default async function Page() {
  const data = await getData()

  return (
    <DataProvider>
      <DataTable data={data} columns={columns} />
      <EditDialog />
    </DataProvider>
  )
}
