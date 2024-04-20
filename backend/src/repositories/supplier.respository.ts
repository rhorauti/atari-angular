import { Suppliers } from '@src/entities/suppliers';
import { dataSource } from '@src/migrations';
import { ICompanyDTO, ICompanyDTOExtended } from './interfaces/ICompany';

export class SupplierRepository {
  private suppliersRepository = dataSource.getRepository(Suppliers);

  async findSupplierByName(nome: string): Promise<Suppliers> {
    return await this.suppliersRepository.findOneBy({
      nome: nome,
    });
  }

  async findSupplierById(id: number): Promise<Suppliers> {
    return await this.suppliersRepository.findOneBy({
      id: id,
    });
  }

  async getSuppliersList(): Promise<Suppliers[]> {
    return await this.suppliersRepository.find();
  }

  /**
   * addNewRegister
   * Adiciona um novo registro da empresa no banco de dados
   * @param registerType tipo de registro (customers, suppliers, suppliers-product, customers-product, etc)
   * @param registerData Os dados que vem do frontend para registrar no banco de dados.
   */
  async addNewCompany(registerData: ICompanyDTO): Promise<Suppliers> {
    delete registerData.id;
    const newSupplier = this.suppliersRepository.create(registerData);
    return this.suppliersRepository.save(newSupplier);
  }

  async updateCompany(
    companyData: ICompanyDTOExtended,
    companyId: string,
  ): Promise<void> {
    await this.suppliersRepository
      .createQueryBuilder()
      .update(Suppliers)
      .set(companyData)
      .where('id = :id', { id: companyId })
      .execute();
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.suppliersRepository
      .createQueryBuilder()
      .delete()
      .from(Suppliers)
      .where('id = :id', { id: companyId })
      .execute();
  }
}
