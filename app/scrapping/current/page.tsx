'use server'

import React from 'react'
import { Log } from '@/partials/log'
import { cookies } from 'next/headers'
import { Start } from '@/partials/start'
import { SaveData } from '@/partials/save-data'

export default async function Page() {
  return (
    <div>
      <div className='mt-5 flex justify-end items-center gap-1'>
        <Start />
        <SaveData />
      </div>
      <Log />
    </div>
  )
}
