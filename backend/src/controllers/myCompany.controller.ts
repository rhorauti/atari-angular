import { MyCompanyRepository } from '@src/repositories/myCompany.repository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MyCompanyController {
  constructor(
    @inject('SupplierRepository')
    private myCompanyRepository: MyCompanyRepository,
  ) {}

  async getMyCompaniesList(response: Response): Promise<Response> {
    const myCompaniesList = await this.myCompanyRepository.getMyCompanyList();
    myCompaniesList.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      }
    });
    if (!myCompaniesList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhum registro encontrando!',
      });
    } else {
      return response.status(200).json({
        status: true,
        message: 'Lista recebida com sucesso!',
        data: myCompaniesList,
      });
    }
  }

  async addNewCompany(request: Request, response: Response): Promise<Response> {
    const myCompany = await this.myCompanyRepository.findMyCompanyByName(
      request.body.nome,
    );
    if (myCompany) {
      return response.status(401).json({
        status: false,
        message: `Empresa ${myCompany.nome} já existe!`,
      });
    } else {
      const newCompany = await this.myCompanyRepository.addNewCompany(
        request.body,
      );
      if (!newCompany) {
        return response.status(500).json({
          status: false,
          message: 'Erro interno do servidor!',
        });
      } else {
        return response.status(200).json({
          status: true,
          message: `Fornecedor ${newCompany.nome} registrado com sucesso!`,
          data: newCompany,
        });
      }
    }
  }

  async updateCompany(request: Request, response: Response): Promise<Response> {
    const myCompany = await this.myCompanyRepository.findMyCompanyById(
      Number(request.params.id),
    );
    if (!myCompany) {
      return response.status(400).json({
        status: false,
        message: 'Empresa não encontrada!',
      });
    } else {
      await this.myCompanyRepository.updateCompany(
        request.body,
        request.params.id,
      );
      return response.status(200).json({
        status: true,
        message: `Empresa ${request.body.nome} alterado com sucesso!`,
      });
    }
  }

  async deleteCompany(request: Request, response: Response): Promise<Response> {
    const myCompany = await this.myCompanyRepository.findMyCompanyById(
      Number(request.params.id),
    );
    if (!myCompany) {
      return response.status(400).json({
        status: false,
        message: 'Empresa não encontrada!',
      });
    } else {
      await this.myCompanyRepository.deleteCompany(request.params.id);
      return response.status(200).json({
        status: true,
        message: `Empresa ${myCompany.nome} excluido com sucesso!`,
      });
    }
  }
}
