import { Lock } from 'lucide-react'

export const Forbidden = () => {
  return (
    <div className='h-screen overflow-hidden flex flex-col justify-center items-center'>
      <div className='flex items-center gap-1'>
        <h1 className='text-2xl font-bold'>403</h1>
        <Lock />
      </div>
      <p className='mt-4 text-lg'>Você não tem permissão para acessar essa página.</p>
    </div>
  )
}
