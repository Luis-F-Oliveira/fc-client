import React from "react"
import { list } from "./title-list"

interface Props {
  param: string
}

export const Title: React.FC<Props> = ({ param }) => {
  const item = list.find(item => item.param === param)

  return (
    <h1 className="text-2xl">
      {item ? item.value : "Parâmetro não encontrado"}
    </h1>
  )
}
