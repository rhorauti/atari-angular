import { dataSource } from '@src/migrations';
import { ICompanyDTO, ICompanyDTOExtended } from './interfaces/ICompany';
import { Company } from '@src/entities/company';

export class CompanyRepository {
  private companyRepository = dataSource.getRepository(Company);

  async findCompanyByName(nome: string): Promise<Company> {
    return await this.companyRepository.findOneBy({
      nome: nome,
    });
  }

  async findCustomerById(id: number): Promise<Company> {
    return await this.companyRepository.findOneBy({
      id: id,
    });
  }

  async getCustomersList(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  /**
   * addNewRegister
   * Adiciona um novo registro da empresa no banco de dados
   * @param registerType tipo de registro (customers, suppliers, suppliers-product, customers-product, etc)
   * @param registerData Os dados que vem do frontend para registrar no banco de dados.
   */
  async addNewCompany(registerData: ICompanyDTO): Promise<Company> {
    delete registerData.id;
    const newCompany = this.companyRepository.create(registerData);
    return this.companyRepository.save(newCompany);
  }

  async updateCompany(
    companyData: ICompanyDTOExtended,
    companyId: string,
  ): Promise<void> {
    await this.companyRepository
      .createQueryBuilder()
      .update(Company)
      .set(companyData)
      .where('id = :id', { id: companyId })
      .execute();
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.companyRepository
      .createQueryBuilder()
      .delete()
      .from(Company)
      .where('id = :id', { id: companyId })
      .execute();
  }
}
