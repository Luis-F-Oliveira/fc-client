'use client'

import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreate } from '@/context/create'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  email: z.string()
})

type IForm = z.infer<typeof schema>

export const Finish = () => {
  const { user } = useCreate()
  const { toast } = useToast()

  const form = useForm<IForm>({
    resolver: zodResolver(schema)
  })

  const { isSubmitting } = form.formState

  React.useEffect(() => {
    form.reset({ email: user?.email })
  }, [user])

  const onSubmit = async (values: IForm) => {
    console.log(JSON.stringify(values))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Ao confirmar o envio, um e-mail será enviado com as instruções de acesso e instalação do aplicativo.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          size='sm'
          isSubmitting={isSubmitting}
        >
          Finalizar
        </Button>
      </form>
    </Form>
  )
}
