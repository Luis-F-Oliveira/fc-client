import { DNForm } from "./date-name-form"
import { SaveData } from "./save-data"
import { Start } from "./start"

interface IList {
  param?: string
  toogle: React.ReactElement
}

export const list: IList[] = [
  {
    param: "current",
    toogle: <Start />
  },
  {
    param: "name-date",
    toogle: <DNForm />
  },
  {
    toogle: <SaveData />
  }
]