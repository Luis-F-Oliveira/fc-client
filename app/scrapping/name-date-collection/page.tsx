'use client'

import React from 'react'
import { Toggles } from './toggles'
import { useScrapping } from '@/context/scrapping'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'

export default function Page() {
  const { data = [], date } = useScrapping()

  return (
    <div className='mt-5 px-2 overflow-y-auto'>
      <div className='w-full flex justify-end items-center gap-1'>
        <Toggles />
      </div>
      <div>
        <h1 className='text-xl font-bold'>
          {date.toLocaleDateString()}
        </h1>
        {data.map((items, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{items.order}</AccordionTrigger>
              <AccordionContent>
                <p>
                  URL: <Link href={items.url} target="_blank">{items.url}</Link>
                </p>
                <p>
                  Nomes:
                </p>
                <ul className="ml-2">
                  {items.servants.map((items, index) => (
                    <li key={index}>{items.name.toLowerCase()}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
