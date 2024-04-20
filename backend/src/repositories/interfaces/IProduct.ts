export interface IProductDTO {
  id: number;
  cadastro: string;
  nome: string;
  cc: string;
  ncm: string;
  unidade: string;
  preco: string;
  fileName: string;
  comentario: string;
}

export interface IResponseProduct {
  date: string;
  status: boolean;
  message: string;
  data: IProductDTO[];
}
