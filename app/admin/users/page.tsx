'use server'

import api from "@/lib/axios"
import { cookies } from "next/headers"
import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getData(token: string | undefined) {
  try {
    const response = await api.get('/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (e: any) {
    throw new Error(e)
  }
}

export default async function Page() {
  const token = cookies().get('jwt')?.value
  const data = await getData(token)

  return <DataTable data={data} columns={columns} />
}
