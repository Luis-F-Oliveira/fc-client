"use server"

import type { IData } from "@/@types/data"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { cookies } from "next/headers"
import api from "@/lib/axios"

async function getData(token: string | undefined): Promise<IData[]> {
  try {
    const res = await api.get('/api/collected_data', { headers: { Authorization: `Bearer ${token}` }})
    return res.data
  } catch (err: any) {
    const { message } = err.response?.data
    console.error(message)
    return []
  }
}

export default async function Page() {
  const token = cookies().get('jwt')?.value
  const data = await getData(token)
  
  return <DataTable data={data} columns={columns} token={token} />
}
