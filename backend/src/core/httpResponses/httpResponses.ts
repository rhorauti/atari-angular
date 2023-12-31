import { Response } from "express";

/**
 * httpResponse
 * Função que padroniza o tipo de responsta para o client side.
 * @param response Response do express
 * @param statusCode statusCode que será mostrado para o client
 * @param responseMessage mensagem que será mostrada para o client
 * @param responseData dados que serão enviados para o client
 * @returns uma promise de Responsta do express com os parâmetros definidos
 */
export const httpResponse = async (
  response: Response,
  statusCode: number,
  responseMessage: string = '',
  data: Record<string, any> = {}
  ): Promise<Response> => {

  if(statusCode == 200) {
    return response.status(statusCode).send({
      date: new Date(),
      status: true,
      message: responseMessage,
      data
    })
  } else {
    return response.status(statusCode).send({
      date: new Date(),
      status: false,
      message: responseMessage,
      data
    })
  }
}
