'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from '@/components/ui/toggle-theme'
import Link from 'next/link'
import React from 'react'

export const Sidebar = () => {
  return (
    <Card className='rounded-none relative'>
      <CardHeader className='text-center'>
        <Link href='/'>
          <CardTitle>
            Facilita Diario
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <Command>
          <CommandInput placeholder="Procurar..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup heading="Páginas">
              <Link href='/home'>
                <CommandItem className='cursor-pointer'>Principal</CommandItem>
              </Link>
              <Link href='/report'>
                <CommandItem className='cursor-pointer'>Relatório</CommandItem>
              </Link>
              <Link href='/data'>
                <CommandItem className='cursor-pointer'>Servidores</CommandItem>
              </Link>
              <CommandItem className='cursor-pointer'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className='p-0 h-6'
                      variant="ghost"
                    >
                      Buscar Dados
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Coletar Dados</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href='/scrapping/current-day-collection'>
                        <DropdownMenuItem className='cursor-pointer'>
                          Coleta Do Dia Atual
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <Link href='/scrapping/name-date-collection'>
                        <DropdownMenuItem className='cursor-pointer'>
                          Coleta Por Nome e Data
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
      <CardFooter className='w-full flex justify-center items-center gap-2 absolute bottom-0'>
        <Button>
          Versão: 2.0
        </Button>
        <ModeToggle />
      </CardFooter>
    </Card>
  )
}
