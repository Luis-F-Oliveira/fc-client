export interface IServant {
  id: number
  enrollment: string
  contract: string
  name: string
  email: string
  active: boolean
}

export interface IData {
  id: number
  order: string | null
  url: string
  servant_id: string
  created_at: string
  updated_at: string
  servants: IServant[]
}

export interface IReport {
  id: number
  data_id: number
  servant_id: number
  data: IData
  servant: IServant
}