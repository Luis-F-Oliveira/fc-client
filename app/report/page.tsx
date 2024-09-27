'use client'

import axios from "@/lib/axios"
import useSWR from "swr"
import type { IReport } from "@/types/data"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default function Page() {
  const { data: data = [], mutate } = useSWR<IReport[]>(
    '/api/reports', async () =>
    await axios
      .get('/api/reports')
      .then(res => res.data)
  )

  return <DataTable mutate={mutate} data={data} columns={columns}/>
}
