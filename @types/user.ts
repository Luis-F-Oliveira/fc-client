export interface IUser {
  id: number
  name: string
  email: string
  entry_code: string
  created_at: string
  updated_at: string
}

export interface IRole {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface IRoleOnUser {
  id: number
  user_id: number
  role_id: number
  user: IUser
  role: IRole
  created_at: string
  updated_at: string
}