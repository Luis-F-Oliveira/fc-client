'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { MailPlus } from 'lucide-react'
import { NinetyRingWithBg } from 'react-svg-spinners'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useSWR from 'swr'
import api from '@/lib/axios'

const schema = z.object({
  date: z.string({
    required_error: "Por favor seleciona a data",
  })
})

type IForm = z.infer<typeof schema>

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IDate {
  date: string
}

const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}

const Modal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [dates, setDates] = React.useState<Array<{ label: string; value: string }>>([])
  const { data: data = [], isLoading } = useSWR<IDate[]>(
    '/api/show_date', async () =>
    await api
      .get('/api/show_date')
      .then(res => res.data)
  )

  React.useEffect(() => {
    const mappedDates = data.map(element => ({
      label: formatDate(element.date),
      value: element.date,
    }));
    setDates(mappedDates);
  }, [data])


  const { toast } = useToast()
  const form = useForm<IForm>({
    resolver: zodResolver(schema),
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: IForm) => {
    await api.post('/api/send_emails_by_date', data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='w-1/4 xl:w-1/5'>
        <DialogHeader>
          <DialogTitle>Enviar E-Mails</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className='w-full flex justify-center fill-current'>
            <NinetyRingWithBg width={30} height={30} />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[180px] xl:w-[220px] 2xl:w-[290px] justify-center",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? dates.find(
                                (date) => date.value === field.value
                              )?.label
                              : "Selecione a data"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[180px] xl:w-[220px] 2xl:w-[290px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Procurar data..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>Nenhuma data encontrada.</CommandEmpty>
                            <CommandGroup>
                              {dates.map((date) => (
                                <CommandItem
                                  value={date.label}
                                  key={date.value}
                                  onSelect={() => {
                                    form.setValue("date", date.value)
                                  }}
                                >
                                  {date.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      date.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className='space-x-1'>
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
                  size='sm'
                  type='submit'
                  isSubmitting={isSubmitting}
                >
                  Continuar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export const DateSend = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type='button'
            size='icon'
            variant='outline'
            onClick={handleOpen}
          >
            <MailPlus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Enviar Email Por Data</p>
        </TooltipContent>
      </Tooltip>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
