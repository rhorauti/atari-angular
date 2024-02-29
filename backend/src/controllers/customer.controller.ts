import { CustomerRepository } from '@src/repositories/customer.repository'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CustomerController {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {}

  async getCustomersList(response: Response): Promise<Response> {
    const customersList = await this.customerRepository.getCustomersList()
    customersList.sort((a, b) => {
      if (a.id > b.id) {
        return -1
      }
    })
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
  ): Promise<Response> {
    const customer = await this.customerRepository.findCustomerByName(
      request.body.nome,
    )
    if (customer) {
      return response.status(401).json({
        status: false,
        message: `Cliente ${customer.nome} já existe!`,
      })
    } else {
      const newCustomer = await this.customerRepository.addNewCompany(
        request.body,
      )
      if (!newCustomer) {
        return response.status(500).json({
          status: false,
          message: 'Erro interno do sevidor!',
        })
      } else {
        return response.status(200).json({
          status: true,
          message: `Cliente ${newCustomer.nome} registrado com sucesso!`,
          data: newCustomer,
        })
      }
    }
  }

  async updateCustomer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const customer = await this.customerRepository.findCustomerById(
      Number(request.params.id),
    )
    if (!customer) {
      return response.status(400).json({
        status: false,
        message: 'Cliente não encontrado!',
      })
    } else {
      await this.customerRepository.updateCompany(
        request.body,
        request.params.id,
      )
      return response.status(200).json({
        status: true,
        message: `Cliente ${request.body.nome} alterado com sucesso!`,
      })
    }
  }

  async deleteCustomer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const customer = await this.customerRepository.findCustomerById(
      Number(request.params.id),
    )
    if (!customer) {
      return response.status(400).json({
        status: false,
        message: 'Cliente não encontrando!',
      })
    } else {
      await this.customerRepository.deleteCompany(request.params.id)
      return response.status(200).json({
        status: true,
        message: `Cliente ${customer.nome} excluido com sucesso!`,
      })
    }
  }
}
