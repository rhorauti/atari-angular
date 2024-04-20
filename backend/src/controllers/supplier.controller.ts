import { SupplierRepository } from '@src/repositories/supplier.respository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SupplierController {
  constructor(
    @inject('SupplierRepository')
    private supplierRepository: SupplierRepository,
  ) {}

  async getSuppliersList(response: Response): Promise<Response> {
    const suppliersList = await this.supplierRepository.getSuppliersList();
    suppliersList.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      }
    });
    if (!suppliersList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhum registro encontrando!',
      });
    } else {
      return response.status(200).json({
        status: true,
        message: 'Lista recebida com sucesso!',
        data: suppliersList,
      });
    }
  }

  async addNewSupplier(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const supplier = await this.supplierRepository.findSupplierByName(
      request.body.nome,
    );
    if (supplier) {
      return response.status(401).json({
        status: false,
        message: `Fornecedor ${supplier.nome} já existe!`,
      });
    } else {
      const newSupplier = await this.supplierRepository.addNewCompany(
        request.body,
      );
      if (!newSupplier) {
        return response.status(500).json({
          status: false,
          message: 'Erro interno do servidor!',
        });
      } else {
        return response.status(200).json({
          status: true,
          message: `Fornecedor ${newSupplier.nome} registrado com sucesso!`,
          data: newSupplier,
        });
      }
    }
  }

  async updateSupplier(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const supplier = await this.supplierRepository.findSupplierById(
      Number(request.params.id),
    );
    if (!supplier) {
      return response.status(400).json({
        status: false,
        message: 'Fornecedor não encontrado!',
      });
    } else {
      await this.supplierRepository.updateCompany(
        request.body,
        request.params.id,
      );
      return response.status(200).json({
        status: true,
        message: `Fornecedor ${request.body.nome} alterado com sucesso!`,
      });
    }
  }

  async deleteSupplier(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const supplier = await this.supplierRepository.findSupplierById(
      Number(request.params.id),
    );
    if (!supplier) {
      return response.status(400).json({
        status: false,
        message: 'Fornecedor não encontrando!',
      });
    } else {
      await this.supplierRepository.deleteCompany(request.params.id);
      return response.status(200).json({
        status: true,
        message: `Fornecedor ${supplier.nome} excluido com sucesso!`,
      });
    }
  }
}
