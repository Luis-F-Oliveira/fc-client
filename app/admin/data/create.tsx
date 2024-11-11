"use client"

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

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { UserRoundPlus } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useToast } from '@/hooks/use-toast'
import api from '@/lib/axios'

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
  token: string | undefined
}

const Forms: React.FC<Props> = ({ token }) => {
  const { toast } = useToast()
  const form = useForm<IForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      active: false
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: IForm) => {
    await api.post('/api/servants', values, {
      headers: {
        Authorization: `Bearer ${token}`
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
        console.error(message)

        toast({
          title: 'Erro',
          description: message,
          variant: 'destructive'
        })
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
        >
          <UserRoundPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar</DialogTitle>
        </DialogHeader>
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
            <DialogFooter>
              <Button
                type='submit'
                size='sm'
                isSubmitting={isSubmitting}
              >
                Enviar
              </Button>
              <DialogClose>
                <Button
                  type='button'
                  size='sm'
                  variant='destructive'
                >
                  Fechar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const Create: React.FC<Props> = ({ token }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Forms token={token} />
      </TooltipTrigger>
      <TooltipContent>
        <p>Adicionar</p>
      </TooltipContent>
    </Tooltip>
  )
}
