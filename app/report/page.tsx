import type { IReport } from "@/@types/data"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import api from "@/lib/axios"

async function getData(): Promise<IReport[]> {
  try {
    const res = await api.get('/api/reports')
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
