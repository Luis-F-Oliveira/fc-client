"use client"

import axios from '@/lib/axios'
import React from 'react'
import useSWR from 'swr'
import { DataTable } from './data-table'
import { columns } from './columns'
import type { IServant } from '@/types/data'

export default function Page() {
  const { data: data = [], mutate } = useSWR<IServant[]>(
    '/api/servants', async () =>
    await axios
        .get('/api/servants')
        .then(res => res.data)
)

  return <DataTable mutate={mutate} data={data} columns={columns} />
}
