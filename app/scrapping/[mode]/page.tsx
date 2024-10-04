import React from 'react'
import { Log, Title, Toogles } from '@/app/scrapping/partials'

interface Props {
  params: {
    mode: string
  }
}

export default function Page({ params }: Props) {
  return (
    <div className='pt-4'>
      <div className='w-full flex justify-between items-center mb-3'>
        <Title param={params.mode} />
        <Toogles param={params.mode} />
      </div>
      <Log />
    </div>
  )
}
