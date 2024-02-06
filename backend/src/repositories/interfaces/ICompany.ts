export interface ICompanyDTO {
  cadastro: string
  nome: string
  email: string
  telefone: string
  isCnpj: boolean
  cnpj: string
  logradouro: string
  numero: number
  complemento: string
  bairro: string
  cidade: string
  estado: string
}

export interface ICompanyDTOExtended extends ICompanyDTO {
  id: number
}

export interface IResponseCompany {
  date: string
  status: boolean
  message: string
  data: ICompanyDTO[]
}
