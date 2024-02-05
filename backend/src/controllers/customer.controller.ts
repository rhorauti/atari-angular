import { RegisterRepository } from '@src/repositories/customer.repository'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class RegisterController {
  constructor(
    @inject('RegisterRepository')
    private registerRepository: RegisterRepository,
  ) {}

  async getCustomersList(response: Response): Promise<Response> {
    const customersList = await this.registerRepository.getCustomersList()
    if (!customersList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhum registro encontrando!',
      })
    } else {
      return response.status(200).json({
        status: true,
        message: 'Lista recebida com sucesso!',
        data: customersList,
      })
    }
  }

  async addNewCustomer(
    request: Request,
    response: Response,
    registerType: string,
  ): Promise<Response> {
    const customer = await this.registerRepository.findCustomerByName(
      request.body.nome,
    )
    if (customer) {
      return response.status(401).json({
        status: false,
        message: 'Cliente já existe!',
      })
    } else {
      const newCompany = await this.registerRepository.addNewCompany(
        registerType,
        request.body,
      )
      if (!newCompany) {
        return response.status(500).json({
          status: false,
          message: 'Erro interno do sevidor!',
        })
      } else {
        return response.status(200).json({
          status: true,
          message: 'Cliente registrado com sucesso!',
          data: newCompany,
        })
      }
    }
  }
}
