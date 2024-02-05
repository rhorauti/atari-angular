import { Customers } from '@src/entities/customers'
import { dataSource } from '@src/migrations'
import { ICompanyDTO } from './interfaces/ICompany'

export class RegisterRepository {
  private customersRepository = dataSource.getRepository(Customers)

  async findCustomerByName(nome: string): Promise<Customers> {
    return await this.customersRepository.findOneBy({
      nome: nome,
    })
  }

  async getCustomersList(): Promise<Customers[]> {
    return await this.customersRepository.find()
  }

  /**
   * addNewRegister
   * Adiciona um novo registro da empresa no banco de dados
   * @param registerType tipo de registro (customers, suppliers, suppliers-product, customers-product, etc)
   * @param registerData Os dados que vem do frontend para registrar no banco de dados.
   */
  async addNewCompany(
    registerType: string,
    registerData: ICompanyDTO,
  ): Promise<Customers> {
    switch (registerType) {
      case 'customers': {
        const newCustomer = this.customersRepository.create(registerData)
        return this.customersRepository.save(newCustomer)
      }
    }
  }
}
