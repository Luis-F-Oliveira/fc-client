'use client'

import React from 'react'
import { New } from './new'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SquareArrowOutUpRight, Trash } from 'lucide-react'
import Link from 'next/link'
import { FilterProvider } from '@/context/filter'

export default function Page() {
  return (
    <FilterProvider>
      <div className='h-[calc(100vh-55px)] mt-10 grid grid-cols-3 gap-1'>
        <section className='overflow-y-auto'>
          <New />
          <div className='space-y-3'>
            <Card>
              <CardHeader>
                <CardTitle>Portaria</CardTitle>
                <CardDescription>Descrições</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo da portaria</p>
              </CardContent>
              <CardFooter className='flex items-center justify-end gap-1'>
                <Button
                  size='icon'
                  variant='destructive'
                >
                  <Trash />
                </Button>
                <Link href={`?filter=order`}>
                  <Button
                    size='icon'
                  >
                    <SquareArrowOutUpRight />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className='flex justify-center items-center col-span-2'>
          editor de filtros aqui
        </section>
      </div>
    </FilterProvider>
  )
}
