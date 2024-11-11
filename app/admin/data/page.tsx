"use server"

import api from '@/lib/axios'
import React from 'react'
import { columns } from './columns'
import { cookies } from 'next/headers'
import { DataProvider } from '@/context/data-context'
import { DataTable } from './data-table'
import { EditDialog } from './edit-dialog'

import type { IServant } from '@/@types/data'

async function getData(token: string | undefined): Promise<IServant[]> {
  try {
    const res = await api.get('/api/servants', { headers: { Authorization: `Bearer ${token}` } })
    return res.data
  } catch (err: any) {
    const status = err.response?.status
    throw new Error(status)
  }
}

export default async function Page() {
  const token = cookies().get('jwt')?.value
  const data = await getData(token)

  return (
    <DataProvider>
      <DataTable token={token} data={data} columns={columns} />
      <EditDialog token={token} />
    </DataProvider>
  )
}
