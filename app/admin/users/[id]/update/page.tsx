import React from 'react'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  return (
    <div className='mt-9'>
      {params.id}
    </div>
  )
}
