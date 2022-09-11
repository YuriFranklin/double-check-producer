import { Injectable } from '@nestjs/common';
import { FindStructuresUseCase } from '../@core/application/usecase/FindStructureUseCase';
import { CreateStructureUseCase } from '../@core/application/usecase/CreateStructureUseCase';
import { CreateStructureDto } from './dto/create-structure.dto';
import { UpdateStructureDto } from './dto/update-structure.dto';
import { FindAllStructureUseCase } from '../@core/application/usecase/FindAllStructureUseCase';

@Injectable()
export class StructureService {
    constructor(
        private createStructureUseCase: CreateStructureUseCase,
        private findStructureUseCase: FindStructuresUseCase,
        private findAllStructureUseCase: FindAllStructureUseCase,
    ) {}

    async create(createStructureDto: CreateStructureDto) {
        return this.createStructureUseCase.execute(createStructureDto);
    }

    async findAll() {
        return this.findAllStructureUseCase.execute();
    }

    async findOne(id: number) {
        return this.findStructureUseCase.execute(id);
    }

    update(id: number, updateStructureDto: UpdateStructureDto) {
        return `This action updates a #${id} structure`;
    }

    remove(id: number) {
        return `This action removes a #${id} structure`;
    }
}
