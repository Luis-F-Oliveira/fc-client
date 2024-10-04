import React from 'react'
import { list } from './toogles-list'

interface Props {
  param: string
}

export const Toogles: React.FC<Props> = ({ param }) => {
  return (
    <div className='flex items-center gap-1'>
      {list.map((item) => {
        if (item.param) {
          if (item.param === param) {
            return React.cloneElement(item.toogle)
          }

          return null
        }

        return React.cloneElement(item.toogle)
      })}
    </div>
  )
}
