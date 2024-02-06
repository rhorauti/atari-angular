import { Customers } from '@src/entities/customers'
import { dataSource } from '@src/migrations'
import { ICompanyDTO, ICompanyDTOExtended } from './interfaces/ICompany'

export class CustomerRepository {
  private customersRepository = dataSource.getRepository(Customers)
  private repository = dataSource.getRepository(Customers)

  async findCustomerByName(nome: string): Promise<Customers> {
    return await this.customersRepository.findOneBy({
      nome: nome,
    })
  }

  async findCustomerById(id: number): Promise<Customers> {
    return await this.customersRepository.findOneBy({
      id: id,
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
  async addNewCompany(registerData: ICompanyDTO): Promise<Customers> {
    const newCustomer = this.customersRepository.create(registerData)
    return this.customersRepository.save(newCustomer)
  }

  async updateCompany(
    companyData: ICompanyDTOExtended,
    CompanyId: string,
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Customers)
      .set(companyData)
      .where('id = :id', { id: CompanyId })
      .execute()
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.customersRepository
      .createQueryBuilder()
      .delete()
      .from(Customers)
      .where('id = :id', { id: companyId })
      .execute()
  }
}
