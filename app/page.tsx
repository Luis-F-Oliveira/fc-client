'use client'

import { Button } from '@/components/ui/button'
import { CircleFadingArrowUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { push } = useRouter()

  const scrollUp = () => {
    push('#docs')
  }

  return (
    <div className='min-h-[calc(100vh-30px)] px-2 mt-5 overflow-y-auto relative'>
      <Button
        className='fixed bottom-5 right-5'
        variant='ghost'
        size='icon'
        onClick={scrollUp}
      >
        <CircleFadingArrowUp />
      </Button>
      <nav className='flex justify-between items-center'>
        <h1 id='docs' className='text-2xl font-bold'>
          Documentação
        </h1>
        <ul className='text-lg flex items-center'>
          <Link href='#about'>
            <li>
              <Button variant='link'>
                Sobre o Projeto
              </Button>
            </li>
          </Link>
          <Link href='#install'>
            <li>
              <Button variant='link'>
                Instalação
              </Button>
            </li>
          </Link>
          <Link href='#operation'>
            <li>
              <Button variant='link'>
                Funcionamento
              </Button>
            </li>
          </Link>
          <Link href='#examples'>
            <li>
              <Button variant='link'>
                Exemplos
              </Button>
            </li>
          </Link>
        </ul>
      </nav>
      <article className='space-y-2 text-justify mt-5'>
        <h2 className='text-xl' id='about'>
          Sobre o Projeto
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
      </article>
      <article className='space-y-2 text-justify mt-5'>
        <h2 className='text-xl' id='install'>
          Instalação
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
      </article>
      <article className='space-y-2 text-justify mt-5'>
        <h2 className='text-xl' id='operation'>
          Funcionamento
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
      </article>
      <article className='space-y-2 text-justify mt-5'>
        <h2 className='text-xl' id='examples'>
          Exemplos
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium vitae deserunt voluptatum numquam aut reiciendis, magni qui consectetur fugiat provident quasi ratione cumque sint ipsa expedita illum maxime id eveniet?
          Numquam esse minus quos atque qui. Corporis architecto velit hic dolor recusandae quas enim error quod totam. Sed, aperiam quibusdam repellendus facilis molestias, voluptatem, earum harum quaerat cupiditate delectus excepturi.
          Culpa tempore in, unde velit voluptatibus fuga quidem, magnam tempora saepe, quam nihil expedita ad. Deleniti suscipit ullam amet quas sed, nostrum excepturi quidem magni eveniet non soluta unde dolor.
        </p>
      </article>
    </div>
  )
}
