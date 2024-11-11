'use client'

import { useCreate } from '@/context/create'
import React from 'react'
import useSWR from 'swr'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Plus } from 'lucide-react'
import { IRole } from '@/@types/user'
import api from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'
import { Badges } from './badges'

const schema = z.object({
  role: z.string({
    required_error: 'Seleciona um cargo',
  })
})

type IForm = z.infer<typeof schema>

interface Props {
  token: string | undefined
}

async function getData(token: string | undefined): Promise<IRole[]> {
  const response = await api.get('/api/roles', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data
}

const Forms: React.FC<Props> = ({ token }) => {
  const { data: roles = [] } = useSWR<IRole[]>(
    '/api/roles', async () =>
    getData(token)
  )
  const { user } = useCreate()
  const { toast } = useToast()

  const form = useForm<IForm>({
    resolver: zodResolver(schema)
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: IForm) => {
    const role = roles.find((el) => el.id.toString() === values.role)
    const data = {
      role_id: role?.id,
      user_id: user?.id
    }

    await api.post('/api/roles_on_users', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        const { message } = res.data

        toast({
          title: 'Cargo adicionado',
          description: message
        })
      })
      .catch((err) => {
        const { message } = err.response.data

        toast({
          title: 'Erro ao adicionar cargo',
          description: message,
          variant: 'destructive'
        })
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-1'>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Cargos" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant='outline'
                  size='icon'
                  isSubmitting={isSubmitting}
                  type='submit'
                >
                  <Plus />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export const Role: React.FC<Props> = ({ token }) => {
  const { user } = useCreate()

  return (
    <div className='space-y-3'>
      <h1 className='text-2xl'>Gerenciar Permissões</h1>
      <Input disabled value={user?.name} />
      <Forms token={token} />
      <Badges token={token} />
    </div>
  )
}
