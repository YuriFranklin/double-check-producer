import { Injectable } from '@nestjs/common';
import { CreateStructureUseCase } from '../@core/application/usecase/CreateStructureUseCase';
import { CreateStructureDto } from './dto/create-structure.dto';
import { UpdateStructureDto } from './dto/update-structure.dto';

@Injectable()
export class StructureService {
    constructor(private createStructureUseCase: CreateStructureUseCase) {}

    async create(createStructureDto: CreateStructureDto) {
        return this.createStructureUseCase.execute(createStructureDto);
    }

    findAll() {
        return `This action returns all structure`;
    }

    findOne(id: number) {
        return `This action returns a #${id} structure`;
    }

    update(id: number, updateStructureDto: UpdateStructureDto) {
        return `This action updates a #${id} structure`;
    }

    remove(id: number) {
        return `This action removes a #${id} structure`;
    }
}
