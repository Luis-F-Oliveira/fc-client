import type { IReport } from "@/types/data"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { cookies } from "next/headers"
import api from "@/lib/axios"
import { Forbidden } from "@/partials/forbidden"

async function getData(): Promise<IReport[] | number> {
  const token = cookies().get('jwt')?.value

  try {
    const res = await api.get('/api/reports', { headers: { Authorization: `Bearer ${token}` }})
    return res.data
  } catch (err: any) {
    const status = err.response?.status
    return status
  }
}

export default async function Page() {
  const data = await getData()

  if (typeof data === 'number' && data === 403) {
    return <Forbidden />
  }

  if (Array.isArray(data)) {
    return <DataTable data={data} columns={columns}/>
  }

  return <p>Carregando...</p>
}
