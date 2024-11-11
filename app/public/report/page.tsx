import type { IReport } from "@/@types/data"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { cookies } from "next/headers"
import api from "@/lib/axios"

async function getData(): Promise<IReport[]> {
  const token = cookies().get('jwt')?.value

  try {
    const res = await api.get('/api/reports', { headers: { Authorization: `Bearer ${token}` }})
    return res.data
  } catch (err: any) {
    const { message } = err.response?.data
    console.error(message)
    return []
  }
}

export default async function Page() {
  const data = await getData()

  return <DataTable data={data} columns={columns}/>
}
