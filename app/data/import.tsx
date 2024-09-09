'use client'

import React from 'react'

import Link from 'next/link'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form'

import { HardDriveUpload, Info } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useToast } from '@/hooks/use-toast'
import api from '@/lib/axios'

const schema = z.object({
  file: z.instanceof(File, {
    message: "Por favor, envie um arquivo do tipo xlsx"
  })
})

type IForm = z.infer<typeof schema>

const Forms = () => {
  const { toast } = useToast()
  const form = useForm<IForm>({
    resolver: zodResolver(schema)
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: IForm) => {
    await api.post('/api/servants/import', values, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
          <HardDriveUpload />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar</DialogTitle>
          <DialogDescription>
            Apenas o formato xlsx é aceito, para mais informações sobre a padronização acesse{' '}
            <Link className="inline-flex gap-0.5" href="">
              <Info size={16} className="relative top-0.5" />
              saiba mais
            </Link>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={form.control}
              name='file'
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      onChange={(event) => onChange(event.target.files && event.target.files[0])}
                      className="cursor-pointer"
                      type='file'
                      accept='.xlsx'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose>
                <Button
                  type='button'
                  size='sm'
                  variant='destructive'
                >
                  Fechar
                </Button>
              </DialogClose>
              <Button
                type='submit'
                size='sm'
                isSubmitting={isSubmitting}
              >
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const Import = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Forms />
      </TooltipTrigger>
      <TooltipContent>
        <p>Importar</p>
      </TooltipContent>
    </Tooltip>
  )
}
