'use server'

import api from "@/lib/axios"
import { cookies } from "next/headers"

export interface IValue {
  entry_code: string
}

export const login = async (values: IValue) => {
  let success = false

  await api.post('/api/login', values)
    .then((res) => {
      const { token } = res.data
      cookies().set('jwt', token, {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      })
      success = true
    })
    .catch(() => {
      success = false
    })

  return success
}

export const logout = async () => {
  const token = cookies().get('jwt')?.value
  let success = false

  if (token) {
    await api.delete('/api/logout', { headers: { Authorization: `Bearer ${token}` } })
    .then(() => {
      success = true
      cookies().delete('jwt')
    })
    .catch(() => success = false)
  }

  return success
}