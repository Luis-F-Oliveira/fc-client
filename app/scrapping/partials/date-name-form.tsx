'use client'

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import anext from "@/lib/anext"

const schema = z.object({
  name: z.string({
    required_error: "O nome é obrigatório."
  }),
  date: z.date({
    required_error: "A data deve ser informada.",
  })
})

type IForm = z.infer<typeof schema>

interface ModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Forms = () => {
  const form = useForm<IForm>({
    resolver: zodResolver(schema),
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: IForm) => {
    await anext.post('/api/name-date-collection', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                O nome enviado deve ser identico ao nome salvo em {' '}
                <Link href='/data'>
                  servidores
                </Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Data final da busca.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-1">
          <DialogClose asChild>
            <Button variant='destructive' size='sm'>
              Cancelar
            </Button>
          </DialogClose>
          <Button size='sm' type='submit' isSubmitting={isSubmitting}>
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  )
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-1/3">
        <DialogHeader>
          <DialogTitle className="uppercase">Buscar dados por nome</DialogTitle>
        </DialogHeader>
        <Forms />
      </DialogContent>
    </Dialog>
  )
}

export const DNForm = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              type='button'
              onClick={handleOpen}
            >
              <Search />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Iniciar Busca</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}