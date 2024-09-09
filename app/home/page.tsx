'use client'

import axios from "@/lib/axios"
import useSWR from "swr"
import type { IData } from "@/types/data"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default function Page() {
  const { data: data = [], mutate } = useSWR<IData[]>(
    '/api/collected_data', async () =>
    await axios
      .get('/api/collected_data')
      .then(res => res.data)
  )

  return <DataTable mutate={mutate} data={data} columns={columns}/>
}
