'use client'

import { IRoleOnUser } from '@/@types/user'
import { Badge } from '@/components/ui/badge'
import { useCreate } from '@/context/create'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/axios'
import React from 'react'
import { OneEightyRing } from 'react-svg-spinners'
import useSWR from 'swr'

interface Props {
  token: string | undefined
}

async function getData(
  token: string | undefined,
  id: number | undefined
): Promise<IRoleOnUser[]> {
  const response = await api.get(`/api/permissions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data
}

export const Badges: React.FC<Props> = ({ token }) => {
  const { user } = useCreate()
  const { toast } = useToast()
  const { data: roles = [], isLoading, mutate } = useSWR<IRoleOnUser[]>(
    user?.id ? `/api/permissions/${user.id}` : null, async () =>
    getData(token, user?.id)
  )

  const remove = async (id: number) => {
    console.log(id)
    await api.delete(`/api/roles_on_users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(() => mutate())
      .catch((err) => {
        const { message } = err.response.data

        toast({
          title: 'Erro ao retirar permissão',
          description: message,
          variant: 'destructive'
        })
      })
  }

  if (isLoading) return <div className="flex justify-center fill-primary"><OneEightyRing /></div>

  return (
    <section className="flex gap-1 flex-wrap">
      {roles?.map((item) => (
        <Badge
          key={item.id}
          className="cursor-pointer hover:bg-red-500 dark:hover:text-white"
          onClick={() => remove(item.id)}
        >
          {item.role.name}
        </Badge>
      ))}
    </section>
  )
}
