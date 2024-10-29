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
import { logout } from '@/lib/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Sidebar = () => {
  const { refresh } = useRouter()
  const handleLogout = async () => {
    const success = await logout()

    if (success) {
      refresh()
    }
  }

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
          <CommandInput placeholder="CTRL + K..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup heading="Páginas Públicas">
              <Link href='/home'>
                <CommandItem className='cursor-pointer'>Principal</CommandItem>
              </Link>
              <Link href='/report'>
                <CommandItem className='cursor-pointer'>Relatório</CommandItem>
              </Link>
            </CommandGroup>
            <CommandGroup heading="Páginas Admin">
              <Link href='/data'>
                <CommandItem className='cursor-pointer'>Servidores</CommandItem>
              </Link>
              <Link href='/users'>
                <CommandItem className='cursor-pointer'>Usuários</CommandItem>
              </Link>
            </CommandGroup>
            <CommandGroup heading="Páginas Coleta">
              <Link href='/scrapping/current'>
                <CommandItem className='cursor-pointer'>Dia Atual</CommandItem>
              </Link>
              <CommandItem disabled className='cursor-pointer'>Nome e Data</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
      <CardFooter className='w-full flex justify-center items-center gap-2 absolute bottom-0'>
        <Button
          variant='destructive'
          onClick={handleLogout}
        >
          Sair
        </Button>
        <ModeToggle />
      </CardFooter>
    </Card >
  )
}
