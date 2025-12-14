export interface Game {
  id: string,
  name: string,
  imageUrl: string,
  desc: string,
  winTax: number,
  gamePrice: number
}

export interface ResponseData {
  message: string,
  status: number,
  token?: string,
  usrdata?: UserData
}

export interface UserData {
  id: string,
  name: string,
  username: string
  email: string,
  cpf: string,
  balance: number,
}