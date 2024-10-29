"use server"

import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import type { IServant } from '@/types/data'
import { cookies } from 'next/headers'
import api from '@/lib/axios'
import { Forbidden } from '@/partials/forbidden'
import { DataProvider } from '@/context/data-context'
import { EditDialog } from './edit-dialog'

async function getData(token: string | undefined): Promise<IServant[] | number> {
  try {
    const res = await api.get('/api/servants', { headers: { Authorization: `Bearer ${token}` }})
    return res.data
  } catch (err: any) {
    const status = err.response?.status
    return status
  }
}

export default async function Page() {
  const token = cookies().get('jwt')?.value
  const data = await getData(token)

  if (typeof data === 'number' && data === 403) {
    return <Forbidden />
  }

  if (Array.isArray(data)) {
    return (
      <DataProvider>
        <DataTable token={token} data={data} columns={columns}/>
        <EditDialog token={token} />
      </DataProvider>
    )
  }

  return <p>Carregando...</p>
}
