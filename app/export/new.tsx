'use client'

import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import React from 'react'

const schema = z.object({
  option: z.string({
    required_error: "Porfavor, selecione um filtro"
  })
})

type IForm = z.infer<typeof schema>

const options = [
  { label: "Portaria", value: "order" },
  { label: "Data específica", value: "date" },
  { label: "Entre datas", value: "datetodate" },
  { label: "Nome", value: "name" },
  { label: "Dominio de e-mail", value: "domain" },
  { label: "Dados associados", value: "associates" },
]

export const New = () => {
  const form = useForm<IForm>({
    resolver: zodResolver(schema)
  })
  const { toast } = useToast()

  const { isSubmitting } = form.formState

  const onSubmit = async (values: IForm) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex justify-center items-center gap-1 mb-5'>
        <FormField
          control={form.control}
          name="option"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? options.find(
                          (option) => option.value === field.value
                        )?.label
                        : "Selecione filtro..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Procurar filtro..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Filtro não encontrado.</CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              form.setValue("option", option.value)
                            }}
                          >
                            {option.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                option.value === field.value
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
            </FormItem>
          )}
        />
        <Button
          type='submit'
          size='icon'
          variant='outline'
          isSubmitting={isSubmitting}
        >
          <Plus />
        </Button>
      </form>
    </Form>
  )
}
