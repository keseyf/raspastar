export interface Game {
  id: string,
  name: string,
  imageUrl: string,
  desc: string,
  winTax: number,
  gamePrice: number
}

export type Order = {
  id: string;
  typeOrder: "withdrawl" | "recharge";
  amount: string;
  desc: string;
  createdAt?: string;
  pixCopyPasteKey?: string
};

export type TabType = "withdrawl" | "recharge";

export interface ResponseData {
  message: string,
  status: number,
  token?: string,
  usrdata?: UserData,
  pixCopyPasteKey?: string
}

export interface UserData {
  id: string,
  name: string,
  username: string
  email: string,
  cpf: string,
  balance: number,
  orders: Order[]
}