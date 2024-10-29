'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'
import { useScrapping } from '@/context/scrapping'

export const Log = () => {
  const { data = [], date } = useScrapping()
  
  return (
    <div>
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
  )
}
