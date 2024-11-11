'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/lib/axios'
import { useCreate } from '@/context/create'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório'
  }).max(255, {
    message: 'O nome não pode ter mais de 255 caracteres'
  }),
  email: z.string({
    required_error: 'O e-mail é obrigatório'
  }).max(255, {
    message: 'O e-mail não pode ter mais de 255 caracteres'
  }).email({
    message: 'O e-mail não é válido'
  })

})

type IForm = z.infer<typeof schema>

interface Props {
  token: string | undefined
}

export const Create: React.FC<Props> = ({ token }) => {
  const { setterUser } = useCreate()
  const { toast } = useToast()
  const form = useForm<IForm>({
    resolver: zodResolver(schema)
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: IForm) => {
    await api.post('/api/register', values, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        const { data } = res
        setterUser(data)

        toast({
          title: 'Sucesso',
          description: 'Usuário cadastrado com sucesso, vá para o próximo passo.'
        })
      })
      .catch((err) => {
        const { message } = err.response.data

        toast({
          title: 'Erro ao Cadastrar',
          description: message,
          variant: 'destructive'
        })
      })
  }

  return (
    <div>
      <h1 className='text-2xl'>Cadastrar Usuário</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size='sm'
            isSubmitting={isSubmitting}
          >
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
