import { MyCompany } from '@src/entities/myCompany'
import { dataSource } from '@src/migrations'
import { ICompanyDTO, ICompanyDTOExtended } from './interfaces/ICompany'

export class MyCompanyRepository {
  private suppliersRepository = dataSource.getRepository(MyCompany)

  async findMyCompanyByName(nome: string): Promise<MyCompany> {
    return await this.suppliersRepository.findOneBy({
      nome: nome,
    })
  }

  async findMyCompanyById(id: number): Promise<MyCompany> {
    return await this.suppliersRepository.findOneBy({
      id: id,
    })
  }

  async getMyCompanyList(): Promise<MyCompany[]> {
    return await this.suppliersRepository.find()
  }

  /**
   * addNewRegister
   * Adiciona um novo registro da empresa no banco de dados
   * @param registerType tipo de registro (customers, suppliers, suppliers-product, customers-product, etc)
   * @param registerData Os dados que vem do frontend para registrar no banco de dados.
   */
  async addNewCompany(registerData: ICompanyDTO): Promise<MyCompany> {
    delete registerData.id
    const newSupplier = this.suppliersRepository.create(registerData)
    return this.suppliersRepository.save(newSupplier)
  }

  async updateCompany(
    companyData: ICompanyDTOExtended,
    companyId: string,
  ): Promise<void> {
    await this.suppliersRepository
      .createQueryBuilder()
      .update(MyCompany)
      .set(companyData)
      .where('id = :id', { id: companyId })
      .execute()
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.suppliersRepository
      .createQueryBuilder()
      .delete()
      .from(MyCompany)
      .where('id = :id', { id: companyId })
      .execute()
  }
}
