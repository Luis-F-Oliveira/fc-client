'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Skeleton } from "@/components/ui/skeleton"
import { IServant } from '@/@types/data'
import useSWR from 'swr'
import api from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  enrollment: z.string({
    required_error: 'Matrícula deve ser informada'
  }).min(6, {
    message: 'A matrícula deve ter no mínimo 6 caracteres'
  }).max(9, {
    message: 'A matrícula deve ter no máximo 9 caracteres'
  }).regex(/^\d+$/, {
    message: 'A matrícula deve conter apenas números'
  }),
  contract: z.string({
    required_error: 'Contrato deve ser informado'
  }).min(1, {
    message: 'O contrato deve ter no mínimo 1 caracter'
  }).max(2, {
    message: 'O contrato deve ter no máximo 2 caracteres'
  }).regex(/^\d+$/, {
    message: 'O contrato deve conter apenas números'
  }),
  name: z.string({
    required_error: 'Nome completo deve ser informado'
  }).max(255, {
    message: 'O nome completo deve ter no máximo 255 caracteres'
  }).regex(/^[A-Za-z\s]+$/, {
    message: 'O nome deve conter apenas letras e espaços, sem caracteres especiais'
  }).transform((val) => val.toUpperCase()),
  email: z.string({
    required_error: 'E-mail deve ser informado'
  }).max(255, {
    message: 'O e-mail deve ter no máximo 255 caracteres'
  }),
  active: z.boolean().default(false).optional()
})

type IForm = z.infer<typeof schema>

interface Props {
  id: number | undefined
  token: string | undefined
}

const Loading = () => {
  return (
    <div className='space-y-3'>
      <div className='space-y-2'>
        <Skeleton className='w-[90px] h-[20px] rounded-lg' />
        <Skeleton className='h-[35px] rounded-lg' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='w-[90px] h-[20px] rounded-lg' />
        <Skeleton className='h-[35px] rounded-lg' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='w-[90px] h-[20px] rounded-lg' />
        <Skeleton className='h-[35px] rounded-lg' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='w-[90px] h-[20px] rounded-lg' />
        <Skeleton className='h-[35px] rounded-lg' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-[60px] rounded-lg' />
      </div>
      <div className='flex justify-end items-center gap-2'>
        <Skeleton className='w-[75px] h-[35px] rounded-lg' />
        <Skeleton className='w-[60px] h-[35px] rounded-lg' />
      </div>
    </div>
  )
}

export const Edit: React.FC<Props> = ({ id, token }) => {
  const { data: data } = useSWR<IServant>(
    `/api/servants/${id}`, async () =>
    await api
      .get(`/api/servants/${id}`, { headers: { 'Authorization': 'Bearer ' + token }})
      .then(res => res.data)
  )

  const { toast } = useToast()

  const form = useForm<IForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      active: false
    }
  })

  React.useEffect(() => {
    if (data) form.reset(data)
  }, [data])

  const { isSubmitting } = form.formState

  const onSubmit = async (values: IForm) => {
    await api.put(`/api/servants/${id}`, values, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        const { message } = res.data

        toast({
          title: 'Sucesso',
          description: message
        })
      })
      .catch((err) => {
        const { message } = err.response.data

        toast({
          title: 'Erro',
          description: message,
          variant: 'destructive'
        })
      })
  }

  if (!data) return <Loading />

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='enrollment'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='contract'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contrato</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                O nome deve ser informado sem qualquer tipo de abreviação.
              </FormDescription>
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
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                O e-mail fornecido será utilizado para exibir os dados do
                usuário cadastrado e para outras funcionalidades.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='active'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Notificações
                </FormLabel>
                <FormDescription>
                  Esse campo é responsável para habilitar as notificações para
                  o usuário.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <DialogFooter className='flex items-center'>
          <DialogClose asChild>
            <Button
              variant='destructive'
              size='sm'
              type='button'
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant='default'
            size='sm'
            type='submit'
            isSubmitting={isSubmitting}
          >
            Enviar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
